import logging
from sqlmodel import Field, SQLModel, Session, create_engine


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


if __name__ == "__main__":
    engine = create_engine("sqlite:///database.db")
    SQLModel.metadata.drop_all(engine)

    logging.basicConfig(filename='log.txt', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    logger = logging.getLogger("sqlalchemy.engine")
    logger.setLevel(logging.INFO)
    
    SQLModel.metadata.create_all(engine)
