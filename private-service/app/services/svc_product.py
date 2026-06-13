from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.repositories.rep_product import (
    rep_get_products, 
    rep_count_products, 
    rep_get_product_by_id,
    rep_get_product_by_sku,
    rep_create_product
)
from app.repositories.rep_category_product import rep_get_category_by_id
from app.shared.utl_validators import validate_exists
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
         
def svc_create_product(
    db: Session,
    sku: str | None,
    name: str, 
    description: str | None,
    category_id: int | None,
    brand: str,
    specifications: str | None,
    requires_installation: bool | None,
    maintenance_time: int | None
):
    try:
        if sku is not None:
            _validate_unique_sku(db, sku)
        if category_id is not None:
            validate_exists(rep_get_category_by_id(db, category_id), 'Categoría')
        
        return rep_create_product(db, sku, name, description, category_id, brand, specifications, requires_installation, maintenance_time)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al procesar el registro')
    


def svc_get_product_by_id(db:Session, product_id: int):
    try:
        product = rep_get_product_by_id(db, product_id)
        if product is None:
            raise HTTPException(status_code=404, detail= 'Producto no encontrado')
        return product
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener el producto')
    

def _validate_unique_sku(db: Session, sku: str, id: int | None = None):
    if rep_get_product_by_sku(db, sku, id) is not None:
        raise HTTPException(status_code=409, detail='Ya existe un producto con ese sku')