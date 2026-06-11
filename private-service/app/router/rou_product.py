from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.auth.auth_scheme import security
from app.schemas.sch_product import SchProductPaginated
from app.services.svc_product import svc_get_products

product_router = APIRouter(dependencies=[Depends(security)])

@product_router.get('/products', response_model=SchProductPaginated)
def get_products(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    search: str | None = Query(default=None),
    category_id : int | None = Query(default=None, gt=0),
    brand: str | None = Query(default=None),
    is_active: bool | None = Query(default=None)
):
    return svc_get_products(db, page, search, category_id, brand, is_active)