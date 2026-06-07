from fastapi import APIRouter, Depends, Query
from app.schemas.sch_category_product import SchCategoryProduct, SchCategoryProductRequest, SchCategoryPaginated
from sqlalchemy.orm import Session
from app.auth.auth_scheme import security
from app.config.database import get_db
from app.services.svc_category_product import (
    svc_get_categories, 
    svc_create_category,
    svc_modify_category,
    svc_deactivate_category
)

category_router = APIRouter(dependencies=[Depends(security)])

@category_router.get('/categories', response_model=SchCategoryPaginated)
def get_categories(
  db: Session = Depends(get_db),
  page: int = Query(default=1, ge=1),
  search: str | None = Query(default=None)):
  return svc_get_categories(db, page, search)

@category_router.post('/categories', response_model=SchCategoryProduct)
def create_category(data: SchCategoryProductRequest, db: Session = Depends(get_db)):
  return svc_create_category(db, data.name, data.description)

@category_router.put('/categories/{id}', response_model=SchCategoryProduct)
def modify_category(id: int, data: SchCategoryProductRequest, db: Session = Depends(get_db)):
  return svc_modify_category(db, id, data.name, data.description)

@category_router.patch('/categories/{id}/deactivate', response_model=SchCategoryProduct)
def deactivate_category(id: int, db: Session = Depends(get_db)):
  return svc_deactivate_category(db, id)