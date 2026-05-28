from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.middlewares.auth_stub import AuthStubMiddleware 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],
)

app.add_middleware(AuthStubMiddleware)

@app.get('/')
def home():
  return {'message': 'Servicio private encendido'}

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
  return JSONResponse(
    status_code=404,
    content={'detail':'Recurso no encontrado'}
  )

@app.exception_handler(401)
async def unauthorized_handler(request: Request, exc):
  return JSONResponse(
    status_code=401,
    content={'detail':'No autorizado. Token ausente, inválido o expirado'}
  )

@app.exception_handler(403)
async def forbidden_handler(request: Request, exc):
  return JSONResponse(
    status_code=403,
    content={'detail':'No tienes permisos para realizar esta operación'}
  )

@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
  return JSONResponse(
    status_code=422,
    content={'detail':'Datos de entrada inválidos'}
  )

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
  return JSONResponse(
    status_code=500,
    content={'detail':'Error interno del servidor'}
  )