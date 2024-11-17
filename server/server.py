from typing import Callable, Generator
from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select

DATABASE_URL = "sqlite:///database.db"


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


def get_session(token: str) -> Generator[Session, None, None]:
    engine = create_engine(DATABASE_URL)
    with Session(engine) as session:
        yield session


app = FastAPI()


@app.get("/heroes")
def hello(db: Session = Depends(get_session)) -> list[Hero]:
    return list(db.exec(select(Hero)).all())


@app.get("/hero")
def hello(name: str, db: Session = Depends(get_session)) -> list[Hero]:
    db.add(Hero(name=name))
    db.commit()
    return list(db.exec(select(Hero)).all())


@app.get("/reset")
def reset(db: Session = Depends(get_session)) -> dict[str, str]:
    SQLModel.metadata.drop_all(db.bind)
    SQLModel.metadata.create_all(db.bind)
    db.add(Hero(name="Deadpool"))
    db.add(Hero(name="Spiderman"))
    db.add(Hero(name="Ironman"))
    db.add(Hero(name="Thor"))
    db.commit()
    return {"message": "Database reset!"}
