from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.repositories.rep_product import (
    rep_get_products, 
    rep_count_products, 
    rep_get_product_by_id
)
from app.shared.utl_pagination import build_pagination

LIMIT = 12

def svc_get_products(
        db: Session, 
        page: int, 
        search: str | None, 
        category_id: int | None, 
        brand: str | None, 
        is_active: bool | None
):
    try:
        offset = (page - 1) * LIMIT
        products = rep_get_products(db,search, LIMIT, offset, category_id, brand, is_active)
        total_products = rep_count_products(db, search, category_id, brand, is_active)
        return build_pagination(products, total_products, page, LIMIT, 'products')
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener los productos')   
         
"""     categories = rep_get_categories_with_products(db, search)
        brands = [row.brand for row in rep_get_brands(db, search)]
        return {
            'total_products' : total_products,
            'page' : page,
            'total_pages' : total_pages,
            'products' : products,
            'filters' : {
                'categories': categories,
                'brands' : brands
            }
        } """


def svc_get_product_by_id(db:Session, product_id: int):
    try:
        product = rep_get_product_by_id(db, product_id)
        if product is None:
            raise HTTPException(status_code=404, detail= 'Producto no encontrado')
        return product
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener el producto')