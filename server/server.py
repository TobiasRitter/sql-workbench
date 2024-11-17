from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select

DATABASE_URL = "sqlite:///database.db"


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


def get_session():
    engine = create_engine(DATABASE_URL)
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()


app = FastAPI()


@app.get("/heroes")
def hello(db: Session = Depends(get_session)) -> list[Hero]:
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
