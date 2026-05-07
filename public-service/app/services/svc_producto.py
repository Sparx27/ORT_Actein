from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from app.models.mod_producto import Producto
from app.models.mod_categoria_producto import CategoriaProducto

LIMITE = 12

def _queryBase():
    return (
        select(
            Producto.id,
            Producto.nombre,
            Producto.marca,
            CategoriaProducto.nombre.label('categoria_nombre')
        )
        .join(CategoriaProducto, Producto.categoria_id == CategoriaProducto.id, isouter=True)
        .where(Producto.activo == True)
    )

def _construirFiltroBusqueda(busqueda: str | None) -> list:
    if not busqueda:
        return []
    busquedaLimpia = busqueda.strip().lower()
    return [
        or_(
            Producto.nombre.ilike(f'%{busquedaLimpia}%'),
            Producto.especificaciones.ilike(f'%{busquedaLimpia}%')
        )
    ]

def _aplicarBusqueda(query, busqueda: str | None):
    filtro = _construirFiltroBusqueda(busqueda)
    if filtro:
        query = query.where(*filtro)
    return query

def svcGetProductos(db: Session, page: int, busqueda: str | None):
    offset = (page - 1) * LIMITE
    query = _queryBase()
    query = _aplicarBusqueda(query, busqueda)
    query = query.limit(LIMITE).offset(offset)
    return db.execute(query).all()

def svcGetFiltros(db: Session, busqueda: str | None):
    filtro = _construirFiltroBusqueda(busqueda)

    queryCategorias = (
        select(CategoriaProducto.id, CategoriaProducto.nombre)
        .join(Producto, Producto.categoria_id == CategoriaProducto.id)
        .where(Producto.activo == True, *filtro)
        .distinct()
    )

    queryMarcas = (
        select(Producto.marca)
        .where(Producto.activo == True, *filtro)
        .distinct()
    )

    categorias = db.execute(queryCategorias).all()
    marcas = [row.marca for row in db.execute(queryMarcas).all()]

    return {"categorias": categorias, "marcas": marcas}