from fastapi import FastAPI
from app.routers.rou_categoria_producto import catrouter
from app.routers.rou_producto import productoRouter

app = FastAPI()

app.include_router(catrouter)
app.include_router(productoRouter)

@app.get('/')
def home():
  return {'mensaje': 'Servicio encendido'}