from fastapi import APIRouter, Depends
from app.schemas.sch_producto import schProductoLista
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.mod_producto import Producto
from app.models.mod_categoria_producto import CategoriaProducto


productoRouter = APIRouter()

@productoRouter.get("/productos", response_model=list[schProductoLista])
def get_productos(db: Session = Depends(get_db)):
    query = (
        select(
            Producto.id,
            Producto.nombre,
            Producto.marca,
            CategoriaProducto.nombre.label("categoria_nombre")  # alias
        )
        .join(CategoriaProducto, Producto.categoria_id == CategoriaProducto.id, isouter=True)
        .where(Producto.activo == True)
    )
    return db.execute(query).all()