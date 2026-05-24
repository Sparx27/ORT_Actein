from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from app.models.mod_product import Product
from app.models.mod_category_product import CategoryProduct


def _base_query():
    return (
        select(
            Product.id,
            Product.name,
            Product.brand,
            CategoryProduct.name.label('category_name')
        )
        .join(CategoryProduct, Product.category_id == CategoryProduct.id, isouter=True)
        .where(Product.is_active == True)
    )

def _build_search_filter(search: str | None) -> list:
    if not search:
        return []
    clean_search = search.strip().lower()
    return [
        or_(
            Product.name.ilike(f'%{clean_search}%'),
            Product.specifications.ilike(f'%{clean_search}%')
        )
    ]

def rep_get_products(
        db: Session, 
        search: str | None, 
        limit: int, offset: int, 
        category_id: int | None, 
        brand: str | None
):
    query = _base_query()
    filters_ = _build_search_filter(search)

    if category_id:
        filters_.append(Product.category_id == category_id)
    
    if brand:
        filters_.append(Product.brand.ilike(brand))

    if filters_:
        query = query.where(*filters_)
    query = query.limit(limit).offset(offset)
    return db.execute(query).all()

def rep_count_products(
        db: Session, 
        search: str | None,
        category_id: int | None,
        brand: str | None
) -> int:
    filters_ = _build_search_filter(search)
    if category_id:
        filters_.append(Product.category_id == category_id)
    
    if brand:
        filters_.append(Product.brand.ilike(brand))
    query = (
        select(func.count())
        .select_from(Product)
        .where(Product.is_active == True, *filters_)
    )
    return db.execute(query).scalar()

def rep_get_product_by_id(db:Session, product_id:int):
    query = (
        select(
            Product.id,
            Product.name,
            Product.description,
            Product.brand,
            CategoryProduct.name.label('category_name'),
            CategoryProduct.id.label('category_id'),
            Product.specifications,
            Product.requires_installation
        )
        .join(CategoryProduct, Product.category_id == CategoryProduct.id, isouter=True)
        .where(Product.is_active == True, Product.id == product_id)
    )
    return db.execute(query).first()
    

def rep_get_categories_with_products(db: Session, search: str | None):
    filters = _build_search_filter(search)
    query = (
        select(CategoryProduct.id, CategoryProduct.name)
        .join(Product, Product.category_id == CategoryProduct.id)
        .where(CategoryProduct.is_active == True, Product.is_active == True, *filters)
        .distinct()
    )
    return db.execute(query).all()


def rep_get_brands(db: Session, search: str | None):
    filters = _build_search_filter(search)
    query = (
        select(Product.brand)
        .where(Product.is_active == True, *filters)
        .distinct()
    )
    return db.execute(query).all()