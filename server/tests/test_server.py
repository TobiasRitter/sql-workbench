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
    response = client.get("/reset?token=abc")
    assert response.status_code == 200
    assert response.json() == "Database reset."

    response = client.get("/hero?token=abc")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Deadpool"},
        {"id": 2, "name": "Spiderman"},
        {"id": 3, "name": "Ironman"},
        {"id": 4, "name": "Thor"},
    ]


def test_add_hero():
    client.get("/reset?token=abc")
    response = client.put("/hero?token=abc", json={"name": "Hulk"})
    assert response.status_code == 200
    assert response.json() == {"id": 5, "name": "Hulk"}

    response = client.get("/hero?token=abc")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Deadpool"},
        {"id": 2, "name": "Spiderman"},
        {"id": 3, "name": "Ironman"},
        {"id": 4, "name": "Thor"},
        {"id": 5, "name": "Hulk"},
    ]
