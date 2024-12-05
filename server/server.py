import queue
from typing import Generator
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

data_store = queue.Queue(maxsize=128)


class Data(BaseModel):
    name: str


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
    data_store.put(data)
    return f"Hello, {data.name}!"


@app.get("/{rest_of_path:path}")
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse("index.html", {"request": req})
