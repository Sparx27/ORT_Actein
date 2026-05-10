from fastapi import FastAPI
from app.routers.rou_category_product import category_router
from app.routers.rou_product import product_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(category_router)
app.include_router(product_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],     
    allow_headers=["*"],
)

@app.get('/')
def home():
  return {'message': 'Servicio encendido'}