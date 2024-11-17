from typing import Generator
from fastapi.testclient import TestClient
from sqlalchemy import StaticPool
from sqlmodel import Session, create_engine
from server.server import app, get_session

client = TestClient(app)


def get_test_session(token: str) -> Generator[Session, None, None]:
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    with Session(engine) as session:
        yield session


app.dependency_overrides[get_session] = get_test_session


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == "Server is running."
