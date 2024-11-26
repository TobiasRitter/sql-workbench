from typing import Generator
from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi.middleware.cors import CORSMiddleware


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


def get_session(token: str) -> Generator[Session, None, None]:
    engine = create_engine("sqlite:///database.db")
    with Session(engine) as session:
        yield session


app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
def hello() -> str:
    return "Server is running."


@app.get("/hero")
def hello(db: Session = Depends(get_session)) -> list[Hero]:
    return list(db.exec(select(Hero)).all())


@app.put("/hero")
def hello(hero: Hero, db: Session = Depends(get_session)) -> Hero:
    db.add(hero)
    db.commit()
    db.refresh(hero)
    return hero


@app.get("/reset")
def reset(db: Session = Depends(get_session)) -> str:
    SQLModel.metadata.drop_all(db.bind)
    SQLModel.metadata.create_all(db.bind)
    db.add(Hero(name="Deadpool"))
    db.add(Hero(name="Spiderman"))
    db.add(Hero(name="Ironman"))
    db.add(Hero(name="Thor"))
    db.commit()
    return "Database reset."
