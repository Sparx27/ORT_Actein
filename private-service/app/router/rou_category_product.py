from fastapi import APIRouter, Depends, Query
from app.schemas.sch_category_product import SchCategoryProduct, SchCategoryProductRequest
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.services.svc_category_product import svc_get_categories, svc_create_category

category_router = APIRouter()

@category_router.get('/categories', response_model=list[SchCategoryProduct])
def get_categories(
  db: Session = Depends(get_db),
  page: int = Query(default=1, ge=1),
  search: str | None = Query(default=None)):
  return svc_get_categories(db, page, search)

@category_router.post('/categories', response_model=SchCategoryProduct)
def create_category(data: SchCategoryProductRequest, db: Session = Depends(get_db)):
  return svc_create_category(db, data.name, data.description)