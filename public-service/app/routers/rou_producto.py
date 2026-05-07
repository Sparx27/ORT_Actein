from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.sch_producto import schProductoLista
from app.services.svc_producto import svcGetProductos


productoRouter = APIRouter()

@productoRouter.get('/productos', response_model=list[schProductoLista])
def get_productos(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    busqueda: str | None = Query(default=None)
):
    return svcGetProductos(db, page, busqueda)