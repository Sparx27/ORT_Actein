from fastapi import APIRouter, Depends
from app.schemas.sch_category_product import SchCategoryProduct
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.services.svc_category_product import svc_get_categories

category_router = APIRouter()

@category_router.get('/categories', response_model=list[SchCategoryProduct])
def get_categories(db: Session = Depends(get_db)):
  return svc_get_categories(db)