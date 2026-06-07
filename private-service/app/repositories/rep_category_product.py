from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from app.models.mod_category_product import CategoryProduct

def _build_search_filter(search: str | None) -> list:
    if not search:
        return []
    clean_search = search.strip().lower()
    return [
        or_(
            CategoryProduct.name.ilike(f'%{clean_search}%'),
            CategoryProduct.description.ilike(f'%{clean_search}%')
        )
    ]

def rep_get_categories(db: Session, search: str | None, limit: int, offset: int):
  filters_ = _build_search_filter(search)
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.is_active == True, *filters_)
    .order_by(CategoryProduct.name)
    .limit(limit)
    .offset(offset)
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