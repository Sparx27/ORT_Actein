from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.repositories.rep_category_product import (
    rep_get_categories, 
    rep_get_category_by_name, 
    rep_create_category,
    rep_get_category_by_id,
    rep_modify_category,
    rep_deactivate_category,
    rep_count_categories
    )
from app.shared.utl_pagination import build_pagination
from app.shared.utl_validators import validate_exists

LIMIT = 12

def svc_get_categories(db: Session, page: int, search: str | None):
    try:
        offset = (page - 1) * LIMIT
        categories = rep_get_categories(db, search, LIMIT, offset)
        total_categories = rep_count_categories(db, search)
        return build_pagination(categories, total_categories, page, LIMIT, 'categories')
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener las categorías')
    
def svc_create_category(db: Session, category_name:str, category_description: str):
    try:
        _validate_unique_name(db, category_name)
        return rep_create_category(db, category_name, category_description)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al procesar el registro')

def svc_modify_category(db: Session, category_id: int, category_name:str, category_description: str):
    try:
        category_actual = validate_exists(rep_get_category_by_id(db, category_id), 'Categoría')
        _validate_unique_name(db, category_name, category_id)
        return rep_modify_category(db, category_actual, category_name, category_description)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al modificar la categoría')
    
def svc_deactivate_category(db: Session, category_id: int):
    try:
        category = validate_exists(rep_get_category_by_id(db, category_id), 'Categoría')
        if category.is_active == False:
            raise HTTPException(status_code=422, detail='La categoría ya está inactiva')
        return rep_deactivate_category(db, category)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al desactivar la categoría')

def _validate_unique_name(db: Session, name: str, id: int | None = None):
    if rep_get_category_by_name(db, name, id) is not None:
        raise HTTPException(status_code=409, detail='Ya existe una categoría con ese nombre')