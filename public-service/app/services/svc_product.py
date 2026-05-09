from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from app.models.mod_product import Product
from app.models.mod_category_product import CategoryProduct

LIMIT = 12

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

def _apply_search(query, search: str | None):
    filter_ = _build_search_filter(search)
    if filter_:
        query = query.where(*filter_)
    return query



def svc_get_products(db: Session, page: int, search: str | None):
    offset = (page - 1) * LIMIT
    query = _base_query()
    query = _apply_search(query, search)
    query = query.limit(LIMIT).offset(offset)
    return db.execute(query).all()







def svc_get_filters(db: Session, search: str | None):
    filter_ = _build_search_filter(search)

    query_categories = (
        select(CategoryProduct.id, CategoryProduct.nombre)
        .join(Product, Product.categoria_id == CategoryProduct.id)
        .where(Product.activo == True, *filter_)
        .distinct()
    )

    query_brands = (
        select(Product.marca)
        .where(Product.activo == True, *filter_)
        .distinct()
    )

    categories = db.execute(query_categories).all()
    brands = [row.marca for row in db.execute(query_brands).all()]

    return {"categories": categories, "brands": brands}