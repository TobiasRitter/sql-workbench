import logging
from sqlmodel import Field, Relationship, SQLModel, create_engine


class Team(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str

    heroes: list["Hero"] = Relationship(back_populates="team")


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    team_id: int | None = Field(default=None, foreign_key="team.id")

    team: Team = Relationship(back_populates="heroes")


class CreateFilter(logging.Filter):
    def filter(self, record):
        return "CREATE" in record.getMessage()


if __name__ == "__main__":
    engine = create_engine("sqlite:///database.db")
    SQLModel.metadata.drop_all(engine)

    # Set up logging
    logger = logging.getLogger("sqlalchemy.engine")
    logger.setLevel(logging.INFO)
    handler = logging.FileHandler("create.sql", mode="w")
    handler.addFilter(CreateFilter())
    logger.addHandler(handler)

    SQLModel.metadata.create_all(engine)
