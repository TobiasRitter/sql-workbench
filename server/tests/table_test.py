from sqlalchemy import func
from sqlmodel import Field, SQLModel, create_engine, Session, select


class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str


class Price(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    price: float


def main() -> None:
    engine = create_engine("sqlite:///test_database.db")
    with Session(engine) as db:
        SQLModel.metadata.drop_all(db.bind)
        SQLModel.metadata.create_all(db.bind)
        db.add(Product(name="Apple"))
        db.add(Product(name="Banana"))
        db.add(Price(product_id=1, price=1.0))
        db.add(Price(product_id=1, price=1.5))
        db.add(Price(product_id=2, price=2.0))
        db.add(Price(product_id=2, price=2.5))
        db.commit()

        statement = (
            select(Product.name, func.max(Price.price))
            .join(Price)
            .where(Product.id == Price.product_id)
            .group_by(Product.name)
        )
        products = db.exec(statement)
        for product, price in products:
            print(product, price)


if __name__ == "__main__":
    main()
