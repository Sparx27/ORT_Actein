from fastapi import APIRouter, Depends
from app.schemas.sch_category_product import SchCategoryProduct
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.mod_category_product import CategoryProduct

category_router = APIRouter()

@category_router.get('/categories', response_model=list[SchCategoryProduct])
def get_categories(db: Session = Depends(get_db)):
  return db.query(CategoryProduct).all()