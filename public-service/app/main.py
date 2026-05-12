from fastapi import FastAPI
from app.routers.rou_categoria_producto import catrouter
from app.routers.rou_producto import productoRouter
from fastapi.middleware.cors import CORSMiddleware
