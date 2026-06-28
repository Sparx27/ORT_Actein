from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.mod_category_product import CategoryProduct

_IS_ACTIVE = CategoryProduct.is_active.is_(True)


def _build_search_filter(search: str | None, is_active: bool | None) -> list:
    filters = []
    if is_active is not None:
        filters.append(CategoryProduct.is_active == is_active)
    if search:
        clean_search = search.strip().lower()
        filters.append(or_(CategoryProduct.name.ilike(f'%{clean_search}%'), CategoryProduct.description.ilike(f'%{clean_search}%')))
    return filters


def rep_get_categories(db: Session, search: str | None, limit: int, offset: int, is_active: bool | None):
    filters_ = _build_search_filter(search, is_active)
    query = select(CategoryProduct).where(*filters_).order_by(CategoryProduct.id).limit(limit).offset(offset)
    return db.execute(query).scalars().all()


def rep_get_categories_id_name(db: Session):
    query = select(CategoryProduct.id, CategoryProduct.name).where(_IS_ACTIVE).order_by(CategoryProduct.name)
    return db.execute(query).all()


def rep_count_categories(db: Session, search: str | None, is_active: bool | None) -> int:
    filters_ = _build_search_filter(search, is_active)
    query = select(func.count()).select_from(CategoryProduct).where(*filters_)
    return db.execute(query).scalar()


def rep_get_category_by_name(db: Session, category_name: str, exclude_id: int | None = None):
    filter_id = [] if exclude_id is None else [CategoryProduct.id != exclude_id]
    query = select(CategoryProduct).where(CategoryProduct.name == category_name, *filter_id)
    return db.execute(query).scalars().first()


def rep_create_category(db: Session, category_name: str, category_description: str):
    new_category = CategoryProduct(name=category_name, description=category_description)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


def rep_get_category_by_id(db: Session, id: int):
    query = select(CategoryProduct).where(CategoryProduct.id == id)
    return db.execute(query).scalars().first()


def rep_modify_category(db: Session, category: CategoryProduct, category_name: str, category_description: str):
    category.name = category_name
    category.description = category_description
    db.commit()
    db.refresh(category)
    return category


def rep_update_category_status(db: Session, category: CategoryProduct, status: bool):
    category.is_active = status
    db.commit()
    db.refresh(category)
    return category
