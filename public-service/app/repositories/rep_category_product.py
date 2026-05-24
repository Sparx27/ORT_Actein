from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.mod_category_product import CategoryProduct

def rep_get_categories(db: Session):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.is_active == True)
  )
  return db.execute(query).scalars().all()