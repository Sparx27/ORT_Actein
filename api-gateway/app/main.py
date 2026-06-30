from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.config.settings import settings
from app.middleware.auth_middleware import AuthMiddleware
from app.router.proxy_router import proxy_router

RATE_LIMIT = '100/minute'

app = FastAPI(title='Actein API Gateway')

limiter = Limiter(key_func=get_remote_address, default_limits=[RATE_LIMIT])
app.state.limiter = limiter

app.add_middleware(AuthMiddleware)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(proxy_router)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={'detail': 'Demasiadas solicitudes, intente nuevamente más tarde'})


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(status_code=404, content={'detail': 'Ruta no encontrada'})


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={'detail': 'Error interno del Gateway'})
