import logging
from sqlmodel import SQLModel, create_engine


if __name__ == "__main__":
    logging.basicConfig()
    logger = logging.getLogger("sqlalchemy.engine")
    logger.setLevel(logging.DEBUG)
    engine = create_engine("sqlite:///database.db")

    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
