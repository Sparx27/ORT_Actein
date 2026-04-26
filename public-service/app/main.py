from fastapi import FastAPI
from app.models.mod_producto import Producto

app = FastAPI()

from datetime import datetime

productos = [
    Producto(id=1, sku="SKU001", nombre="Aire Acondicionado Split 3000W", categoria_id=1, marca="Samsung", especificaciones="3000W, frío/calor, inverter", instalacion=True, activo=True, creado=datetime.now()),
    Producto(id=2, sku="SKU002", nombre="Ventilador de Techo", categoria_id=1, marca="Liliana", especificaciones="5 aspas, 3 velocidades", instalacion=True, activo=True, creado=datetime.now()),
    Producto(id=3, sku="SKU003", nombre="Termotanque 50L", categoria_id=2, marca="Rheem", especificaciones="50 litros, gas natural", instalacion=True, activo=True, creado=datetime.now()),
    Producto(id=4, sku="SKU004", nombre="Panel Solar 400W", categoria_id=3, marca="Jinko", especificaciones="400W, monocristalino", instalacion=True, activo=False, creado=datetime.now()),
    Producto(id=5, sku="SKU005", nombre="Calefactor Eléctrico", categoria_id=2, marca="Calorama", especificaciones="2000W, termostato digital", instalacion=False, activo=True, creado=datetime.now()),
]


@app.get('/')
def home():
  return {'mensaje': 'Servicio encendido'}

@app.get('/productos')
def lista_productos():
  return {'productos': productos}


