from pydantic import BaseModel
from datetime import datetime

"""
CREATE TABLE public.PRODUCTO (
  ID SERIAL PRIMARY KEY,
  SKU VARCHAR(255) UNIQUE,
  NOMBRE VARCHAR(255) NOT NULL,
  CATEGORIA_ID INTEGER REFERENCES public.CATEGORIA_PRODUCTO(ID),
  MARCA VARCHAR(255) NOT NULL,
  ESPECIFICACIONES TEXT,
  INSTALACION BOOLEAN,
  ACTIVO BOOLEAN NOT NULL DEFAULT TRUE,
  CREADO TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);  
"""
class SchemaProducto(BaseModel):
  id: int
  sku: str
  nombre: str
  categoria_id: int
  marca: str
  especificaciones: str
  instalacion: bool
  activo: bool
  creado: datetime