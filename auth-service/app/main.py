from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router.rou_login import login_router

app = FastAPI()

app.include_router(login_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def home():
    return {'message': 'Servicio auth encendido'}
