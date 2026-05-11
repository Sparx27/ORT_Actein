from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware
from app.routers.rou_category_product import category_router
from app.routers.rou_product import product_router

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

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Error interno del servidor"}
    )