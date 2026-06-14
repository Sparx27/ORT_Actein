from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session

from app.auth.auth_scheme import security
from app.config.database import get_db
from app.schemas.sch_product import SchProduct, SchProductPaginated, SchProductRequest, SchProductStatusUpdate
from app.services.svc_product import svc_create_product, svc_get_products, svc_modify_product, svc_update_status

product_router = APIRouter(dependencies=[Depends(security)])


@product_router.get('/products', response_model=SchProductPaginated)
def get_products(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    search: str | None = Query(default=None),
    category_id: int | None = Query(default=None, gt=0),
    brand: str | None = Query(default=None),
    is_active: bool | None = Query(default=None),
):
    return svc_get_products(db, page, search, category_id, brand, is_active)


@product_router.post('/products', response_model=SchProduct, status_code=201)
def create_product(data: SchProductRequest, db: Session = Depends(get_db)):
    return svc_create_product(db, data)


@product_router.put('/products/{id}', response_model=SchProduct)
def modify_product(data: SchProductRequest, id: int = Path(gt=0), db: Session = Depends(get_db)):
    return svc_modify_product(db, id, data)


@product_router.patch('/products/{id}/status', response_model=SchProduct)
def update_product_status(data: SchProductStatusUpdate, id: int = Path(gt=0), db: Session = Depends(get_db)):
    return svc_update_status(db, id, data)
