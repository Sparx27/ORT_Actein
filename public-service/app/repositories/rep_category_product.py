from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.mod_category_product import CategoryProduct

def rep_get_categories(db: Session):
  db.execute(select(CategoryProduct)).scalars().all()