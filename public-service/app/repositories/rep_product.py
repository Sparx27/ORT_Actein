from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from app.models.mod_product import Product
from app.models.mod_category_product import CategoryProduct


def _base_query():
    return (
        select(
            Product.id,
            Product.nombre,
            Product.marca,
            CategoryProduct.nombre.label('category_name')
        )
        .join(CategoryProduct, Product.categoria_id == CategoryProduct.id, isouter=True)
        .where(Product.activo == True)
    )

def _build_search_filter(search: str | None) -> list:
    if not search:
        return []
    clean_search = search.strip().lower()
    return [
        or_(
            Product.nombre.ilike(f'%{clean_search}%'),
            Product.especificaciones.ilike(f'%{clean_search}%')
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
        filters_.append(Product.categoria_id == category_id)
    
    if brand:
        filters_.append(Product.marca.ilike(brand))

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
        filters_.append(Product.categoria_id == category_id)
    
    if brand:
        filters_.append(Product.marca == brand)
    query = (
        select(func.count())
        .select_from(Product)
        .where(Product.activo == True, *filters_)
    )
    return db.execute(query).scalar()

def rep_get_product_by_id(db:Session, product_id:int):
    query = (
        select(
            Product.id,
            Product.nombre,
            Product.marca,
            CategoryProduct.nombre.label('category_name'),
            Product.especificaciones
        )
        .join(CategoryProduct, Product.categoria_id == CategoryProduct.id, isouter=True)
        .where(Product.activo == True, Product.id == product_id)
    )
    return db.execute(query).first()
    

def rep_get_categories_with_products(db: Session, search: str | None):
    filters = _build_search_filter(search)
    query = (
        select(CategoryProduct.id, CategoryProduct.nombre)
        .join(Product, Product.categoria_id == CategoryProduct.id)
        .where(Product.activo == True, *filters)
        .distinct()
    )
    return db.execute(query).all()


def rep_get_brands(db: Session, search: str | None):
    filters = _build_search_filter(search)
    query = (
        select(Product.marca)
        .where(Product.activo == True, *filters)
        .distinct()
    )
    return db.execute(query).all()