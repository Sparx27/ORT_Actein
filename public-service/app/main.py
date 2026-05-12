from fastapi import FastAPI
from app.routers.rou_categoria_producto import catrouter
from app.routers.rou_producto import productoRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(catrouter)
app.include_router(productoRouter)

@app.get('/')
def home():
  return {'mensaje': 'Servicio encendido'}