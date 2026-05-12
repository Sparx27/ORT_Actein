from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.sch_product import SchProductDetail, SchFiltersProduct, SchProductPaginated
from app.services.svc_product import svc_get_products, svc_get_filters, svc_get_product_by_id

product_router = APIRouter()

@product_router.get('/products', response_model=SchProductPaginated)
def get_products(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    search: str | None = Query(default=None),
    category_id : int | None = Query(default=None),
    brand: str | None = Query(default=None)
):
    return svc_get_products(db, page, search, category_id, brand)

@product_router.get('/products/filters', response_model=SchFiltersProduct)
def get_filters(
    db: Session = Depends(get_db),
    search: str | None = Query(default=None)
):
    return svc_get_filters(db, search)

@product_router.get('/products/{product_id}', response_model=SchProductDetail)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return svc_get_product_by_id(db, product_id)