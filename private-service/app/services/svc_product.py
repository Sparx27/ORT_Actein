from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.repositories.rep_category_product import rep_get_category_by_id
from app.repositories.rep_product import (
    rep_count_products,
    rep_create_product,
    rep_get_product_by_id,
    rep_get_product_by_sku,
    rep_get_products,
    rep_modify_product,
)
from app.schemas.sch_product import SchProductRequest, SchProductStatusUpdate
from app.shared.utl_pagination import build_pagination
from app.shared.utl_validators import validate_exists

LIMIT = 12


def svc_get_products(db: Session, page: int, search: str | None, category_id: int | None, brand: str | None, is_active: bool | None):
    try:
        offset = (page - 1) * LIMIT
        products = rep_get_products(db, search, LIMIT, offset, category_id, brand, is_active)
        total_products = rep_count_products(db, search, category_id, brand, is_active)
        return build_pagination(products, total_products, page, LIMIT, 'products')
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener los productos')


def svc_create_product(db: Session, product_create: SchProductRequest):
    try:
        if product_create.category_id is not None:
            validate_exists(rep_get_category_by_id(db, product_create.category_id), 'Categoría')
        if product_create.sku is not None:
            _validate_unique_sku(db, product_create.sku)
        product_dict = product_create.model_dump()
        return rep_create_product(db, product_dict)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al procesar el registro')


def svc_modify_product(db: Session, product_id: int, product_modify: SchProductRequest):
    try:
        product = svc_get_product_by_id(db, product_id)
        if product_modify.category_id is not None:
            validate_exists(rep_get_category_by_id(db, product_modify.category_id), 'Categoría')
        if product_modify.sku is not None:
            _validate_unique_sku(db, product_modify.sku, product_id)
        product_dict = product_modify.model_dump()
        return rep_modify_product(db, product, product_dict)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al modificar el producto')


def svc_get_product_by_id(db: Session, product_id: int):
    product = rep_get_product_by_id(db, product_id)
    return validate_exists(product, 'Producto')


def svc_update_status(db: Session, product_id: int, product_status: SchProductStatusUpdate):
    try:
        product = svc_get_product_by_id(db, product_id)
        product_dict = product_status.model_dump()
        return rep_modify_product(db, product, product_dict)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al modificar el estado')


def _validate_unique_sku(db: Session, sku: str, id: int | None = None):
    if rep_get_product_by_sku(db, sku, id) is not None:
        raise HTTPException(status_code=409, detail='Ya existe un producto con ese sku')
