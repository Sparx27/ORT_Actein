from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session

from app.auth.auth_scheme import security
from app.config.database import get_db
from app.schemas.sch_category_product import (
    SchCategory,
    SchCategoryPaginated,
    SchCategoryProduct,
    SchCategoryProductRequest,
    SchCategoryStatusUpdate,
)
from app.services.svc_category_product import (
    svc_create_category,
    svc_get_categories,
    svc_get_categories_id_name,
    svc_get_category_by_id,
    svc_modify_category,
    svc_update_category_status,
)

category_router = APIRouter(dependencies=[Depends(security)])


@category_router.get('/categories', response_model=SchCategoryPaginated)
def get_categories(db: Session = Depends(get_db), page: int = Query(default=1, ge=1), search: str | None = Query(default=None)):
    return svc_get_categories(db, page, search)


@category_router.get('/categories/options', response_model=list[SchCategory])
def get_categories_id_name(db: Session = Depends(get_db)):
    return svc_get_categories_id_name(db)


@category_router.get('/categories/{id}', response_model=SchCategoryProduct)
def get_category_by_id(id: int = Path(gt=0), db: Session = Depends(get_db)):
    return svc_get_category_by_id(db, id)


@category_router.post('/categories', response_model=SchCategoryProduct, status_code=201)
def create_category(data: SchCategoryProductRequest, db: Session = Depends(get_db)):
    return svc_create_category(db, data.name, data.description)


@category_router.put('/categories/{id}', response_model=SchCategoryProduct)
def modify_category(data: SchCategoryProductRequest, id: int = Path(gt=0), db: Session = Depends(get_db)):
    return svc_modify_category(db, id, data.name, data.description)


@category_router.patch('/categories/{id}/status', response_model=SchCategoryProduct)
def update_category_status(data: SchCategoryStatusUpdate, id: int = Path(gt=0), db: Session = Depends(get_db)):
    return svc_update_category_status(db, id, data.is_active)
