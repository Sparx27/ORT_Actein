from sqlalchemy.orm import Session
from app.repositories.rep_product import rep_get_products, rep_get_brands, rep_get_categories_with_products
LIMIT = 12

def svc_get_products(db: Session, page: int, search: str | None, category_id: int | None, brand: str | None):
    offset = (page - 1) * LIMIT
    return rep_get_products(db,search, LIMIT, offset, category_id, brand)

def svc_get_filters(db: Session, search: str | None):
    categories = rep_get_categories_with_products(db, search)
    brands = [row.marca for row in rep_get_brands(db, search)]

    return {'categories': categories, 'brands': brands}