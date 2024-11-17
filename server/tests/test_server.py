from typing import Generator
from fastapi.testclient import TestClient
from sqlalchemy import StaticPool
from sqlmodel import Session, create_engine
from server.server import app, get_session

client = TestClient(app)


def get_test_session(token: str) -> Generator[Session, None, None]:
    engine = create_engine("sqlite:///test_database.db")
    with Session(engine) as session:
        yield session


app.dependency_overrides[get_session] = get_test_session


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == "Server is running."


def test_reset():
    response1 = client.get("/reset?token=abc")
    assert response1.status_code == 200
    assert response1.json() == "Database reset."

    response2 = client.get("/heroes?token=abc")
    assert response2.status_code == 200
    assert response2.json() == [
        {"id": 1, "name": "Deadpool"},
        {"id": 2, "name": "Spiderman"},
        {"id": 3, "name": "Ironman"},
        {"id": 4, "name": "Thor"},
    ]
