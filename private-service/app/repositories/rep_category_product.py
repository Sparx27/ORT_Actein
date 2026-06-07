from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.mod_category_product import CategoryProduct

def rep_get_categories(db: Session):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.is_active == True)
    .order_by(CategoryProduct.name)
  )
  return db.execute(query).scalars().all()

def rep_get_category_by_name(db: Session, category_name: str):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.name == category_name)
  )
  return db.execute(query).scalars().first()

def rep_create_category(db: Session, category_name: str, category_description: str):
  new_category = CategoryProduct(name = category_name, description= category_description)
  db.add(new_category)
  db.commit()
  db.refresh(new_category)
  return new_category