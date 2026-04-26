from fastapi import FastAPI
from app.routers.rou_categoria_producto import catrouter

app = FastAPI()

app.include_router(catrouter)

@app.get('/')
def home():
  return {'mensaje': 'Servicio encendido'}