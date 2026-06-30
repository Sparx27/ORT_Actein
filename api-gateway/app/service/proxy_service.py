import httpx
from fastapi import Request
from fastapi.responses import JSONResponse, Response

from app.repository.backend_repository import forward_request


async def proxy_request(request: Request, target_url: str, path: str) -> Response:
    url = f'{target_url}/{path}'
    try:
        backend_response = await forward_request(
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

    return Response(
        content=backend_response.content,
        status_code=backend_response.status_code,
        headers=dict(backend_response.headers),
    )
