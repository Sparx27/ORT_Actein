import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.auth.auth_middleware import AuthMiddleware
from app.config.settings import settings

RATE_LIMIT = '100/minute'

app = FastAPI(title='Actein API Gateway')

limiter = Limiter(key_func=get_remote_address, default_limits=[RATE_LIMIT])
app.state.limiter = limiter

app.add_middleware(AuthMiddleware)

app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


async def proxy(request: Request, target_url: str, path: str):
    async with httpx.AsyncClient() as client:
        url = f'{target_url}/{path}'
        try:
            response = await client.request(
                method=request.method,
                url=url,
                params=request.query_params,
                headers=dict(request.headers),
                content=await request.body(),
            )
        except httpx.TimeoutException:
            return JSONResponse(status_code=504, content={'detail': 'El servicio tardó demasiado en responder'})
        except httpx.RequestError:
            return JSONResponse(status_code=502, content={'detail': 'El servicio no está disponible'})

        return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))


@app.api_route('/auth/{path:path}', methods=['GET', 'POST'])
async def auth_proxy(request: Request, path: str):
    return await proxy(request, settings.auth_service_url, path)


@app.api_route('/private/{path:path}', methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
async def private_proxy(request: Request, path: str):
    return await proxy(request, settings.private_service_url, path)


@app.api_route('/public/{path:path}', methods=['GET'])
async def public_proxy(request: Request, path: str):
    return await proxy(request, settings.public_service_url, path)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={'detail': 'Demasiadas solicitudes, intente nuevamente más tarde'})


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(status_code=404, content={'detail': 'Ruta no encontrada'})


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={'detail': 'Error interno del Gateway'})
