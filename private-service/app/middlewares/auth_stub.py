from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

EXCLUDED_PATHS = ["/", "/docs", "/openapi.json", "/redoc"]

class AuthStubMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in EXCLUDED_PATHS:
            return await call_next(request)

        # STUB: por ahora deja pasar todo.
        # Cuando llegue el auth service, acá se valida el JWT
        # y se retorna 401 si el token está ausente o es inválido.
        return await call_next(request)