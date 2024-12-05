from collections import OrderedDict
from typing import Generator
from uuid import uuid4
from fastapi import Depends, FastAPI, Request
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


def get_session(token: str) -> Generator[Session, None, None]:
    engine = create_engine("sqlite:///database.db")
    with Session(engine) as session:
        yield session


app = FastAPI()
app.mount("/static", StaticFiles(directory="./client/build/static"), name="static")
templates = Jinja2Templates(directory="./client/build")


class Data(BaseModel):
    name: str


class LimitedSizeDict(OrderedDict):
    def __init__(self, *args, **kwds):
        self.size_limit = kwds.pop("size_limit", None)
        OrderedDict.__init__(self, *args, **kwds)
        self._check_size_limit()

    def __setitem__(self, key, value):
        OrderedDict.__setitem__(self, key, value)
        self._check_size_limit()

    def _check_size_limit(self):
        if self.size_limit is not None:
            while len(self) > self.size_limit:
                self.popitem(last=False)


data_store = LimitedSizeDict(size_limit=128)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
def hello() -> str:
    return "Server is running."


@app.get("/api/hero")
def hello(db: Session = Depends(get_session)) -> list[Hero]:
    return list(db.exec(select(Hero)).all())


@app.put("/api/hero")
def hello(hero: Hero, db: Session = Depends(get_session)) -> Hero:
    db.add(hero)
    db.commit()
    db.refresh(hero)
    return hero


@app.get("/api/reset")
def reset(db: Session = Depends(get_session)) -> str:
    SQLModel.metadata.drop_all(db.bind)
    SQLModel.metadata.create_all(db.bind)
    db.add(Hero(name="Deadpool"))
    db.add(Hero(name="Spiderman"))
    db.add(Hero(name="Ironman"))
    db.add(Hero(name="Thor"))
    db.commit()
    return "Database reset."


@app.post("/api/greet")
def greet(data: Data) -> str:
    uid = str(uuid4())
    data_store[uid] = data
    return uid


@app.get("/api/greet/{uid}")
def greet(uid: str) -> str:
    return data_store.get(uid).name


@app.get("/{rest_of_path:path}")
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse("index.html", {"request": req})
