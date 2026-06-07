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
    rep_count_categories,
    rep_get_category_by_name_excluding_id
    )
import math

LIMIT = 12

def svc_get_categories(db: Session, page: int, search: str | None):
    try:
        offset = (page - 1) * LIMIT
        categories = rep_get_categories(db, search, LIMIT, offset)
        total_categories = rep_count_categories(db, search)
        total_pages = math.ceil(total_categories/LIMIT) if total_categories > 0 else 1
        return {
            'total_categories' : total_categories,
            'page' : page,
            'total_pages' : total_pages,
            'categories' : categories
        }
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
        _validate_unique_name2(db, category_name, category_id)
        category_actual = _validate_exists_by_id(db, category_id)
        return rep_modify_category(db, category_actual, category_name, category_description)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al modificar la categoría')
    
def svc_deactivate_category(db: Session, category_id: int):
    try:
        category = _validate_exists_by_id(db, category_id)
        if category.is_active == False:
            raise HTTPException(status_code=422, detail='La categoría ya está inactiva')
        return rep_deactivate_category(db, category)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al desactivar la categoría')

def _validate_unique_name(db, name):
    if rep_get_category_by_name(db, name) is not None:
        raise HTTPException(status_code=409, detail='Ya existe una categoría con ese nombre')

def _validate_unique_name2(db, name, id):
    if rep_get_category_by_name_excluding_id(db, name, id) is not None:
        raise HTTPException(status_code=409, detail='Ya existe una categoría con ese nombre')
       
def _validate_exists_by_id(db, id):
    category = rep_get_category_by_id(db, id)
    if  category is None:
        raise HTTPException(status_code=404, detail='Categoría no encontrada')   
    return category 