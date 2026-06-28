import httpx
from fastapi import FastAPI, Request
from fastapi.responses import Response

from app.auth.auth_middleware import AuthMiddleware
from app.config.settings import settings

app = FastAPI(title='Actein API Gateway')
app.add_middleware(AuthMiddleware)


async def proxy(request: Request, target_url: str, path: str):
    async with httpx.AsyncClient() as client:
        url = f'{target_url}/{path}'

        response = await client.request(method=request.method, url=url, headers=dict(request.headers), content=await request.body())
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
