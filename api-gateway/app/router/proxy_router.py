from fastapi import APIRouter, Request

from app.config.settings import settings
from app.service.proxy_service import proxy_request

proxy_router = APIRouter()


@proxy_router.api_route('/auth/{path:path}', methods=['GET', 'POST'])
async def auth_proxy(request: Request, path: str):
    return await proxy_request(request, settings.auth_service_url, path)


@proxy_router.api_route('/private/{path:path}', methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
async def private_proxy(request: Request, path: str):
    return await proxy_request(request, settings.private_service_url, path)


@proxy_router.api_route('/public/{path:path}', methods=['GET'])
async def public_proxy(request: Request, path: str):
    return await proxy_request(request, settings.public_service_url, path)
