from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.auth.auth_handler import verify_token
from fastapi import HTTPException

EXCLUDED_PATHS = ['/', '/docs', '/openapi.json', '/redoc', '/login']

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if request.url.path in EXCLUDED_PATHS:
            return await call_next(request)
        authorization = request.headers.get('Authorization')
        if authorization is None or not authorization.startswith('Bearer '):
            return JSONResponse(
                status_code=401,
                content={'detail':'No autorizado'}
            )
        token = authorization.split(' ', 1)[1]
        try:
            payload = verify_token(token)
            request.state.user = payload
            return await call_next(request)
        except HTTPException:
            return JSONResponse(status_code=401, content={'detail' : 'Token inválido'})