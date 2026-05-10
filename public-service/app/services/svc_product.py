from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.rep_product import rep_get_products, rep_get_brands, rep_get_categories_with_products, rep_count_products, rep_get_product_by_id
import math
LIMIT = 12

def svc_get_products(db: Session, page: int, search: str | None, category_id: int | None, brand: str | None):
    offset = (page - 1) * LIMIT
    products = rep_get_products(db,search, LIMIT, offset, category_id, brand)
    total_products = rep_count_products(db,search)
    total_pages = math.ceil(total_products/LIMIT) if total_products > 0 else 1
    return {
        'total_products' : total_products,
        'page' : page,
        'total_pages' : total_pages,
        'products' : products
    }

def svc_get_filters(db: Session, search: str | None):
    categories = rep_get_categories_with_products(db, search)
    brands = [row.marca for row in rep_get_brands(db, search)]

    return {'categories': categories, 'brands': brands}

def svc_get_product_by_id(db:Session, product_id: int):
    product = rep_get_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=400, detail= 'Producto no encontrado')
    return product