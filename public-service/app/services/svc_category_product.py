from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.repositories.rep_category_product import rep_get_categories


def svc_get_category_product(db: Session):
    try:
        return rep_get_categories(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail='Error al obtener las categorías')
