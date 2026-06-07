from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from app.models.mod_category_product import CategoryProduct

_IS_ACTIVE = CategoryProduct.is_active == True

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
    .where(_IS_ACTIVE, *filters_)
    .order_by(CategoryProduct.name)
    .limit(limit)
    .offset(offset)
  )
  return db.execute(query).scalars().all()

def rep_count_categories(
        db: Session, 
        search: str | None,
) -> int:
    filters_ =_build_search_filter(search)

    query = (
        select(func.count())
        .select_from(CategoryProduct)
        .where(_IS_ACTIVE, *filters_)
    )
    return db.execute(query).scalar()

def rep_get_category_by_name(db: Session, category_name: str):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.name == category_name)
  )
  return db.execute(query).scalars().first()

def rep_get_category_by_name_excluding_id(db, category_name, exclude_id):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.name == category_name, CategoryProduct.id != exclude_id)
  )
  return db.execute(query).scalars().first()

def rep_create_category(db: Session, category_name: str, category_description: str):
  new_category = CategoryProduct(name = category_name, description= category_description)
  db.add(new_category)
  db.commit()
  db.refresh(new_category)
  return new_category

def rep_get_category_by_id(db: Session, id: int):
  query = (
    select(CategoryProduct)
    .where(CategoryProduct.id == id)
  )
  return db.execute(query).scalars().first()

def rep_modify_category(db: Session, category_actual: CategoryProduct, category_name: str, category_description: str):
   category_actual.name = category_name
   category_actual.description = category_description
   db.commit()
   db.refresh(category_actual)
   return category_actual

def rep_deactivate_category(db: Session, category: CategoryProduct):
   category.is_active = False
   db.commit()
   db.refresh(category)
   return category
   