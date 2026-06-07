from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.repositories.rep_category_product import rep_get_categories, rep_get_category_by_name, rep_create_category

LIMIT = 12

def svc_get_categories(db: Session, page: int, search: str | None):
    try:
        offset = (page - 1) * LIMIT
        return rep_get_categories(db, search, LIMIT, offset)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener las categorías')
    
def svc_create_category(db: Session, category_name:str, category_description: str):
    try:
        if rep_get_category_by_name(db, category_name) is not None:
            raise HTTPException(status_code=409, detail='Ya existe una categoria con ese nombre')
        return rep_create_category(db, category_name, category_description)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al procesar el registro')
