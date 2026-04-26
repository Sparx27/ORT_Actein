from fastapi import APIRouter, Depends
from app.schemas.sch_categoria_producto import SchCategoriaProducto
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.models.mod_categoria_producto import CategoriaProducto

catrouter = APIRouter()

@catrouter.get('/categorias', response_model=list[SchCategoriaProducto])
def get_categorias(db: Session = Depends(get_db)):
  return db.query(CategoriaProducto).all()