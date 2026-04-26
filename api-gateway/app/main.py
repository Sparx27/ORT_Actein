import os
import httpx
from fastapi import FastAPI, Request
from fastapi.responses import Response
from dotenv import load_dotenv
 
load_dotenv()

PUBLIC_SERVICE_URL = os.getenv("PUBLIC_SERVICE_URL")
PRIVATE_SERVICE_URL = os.getenv("PRIVATE_SERVICE_URL")
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL")
 
app = FastAPI(title="Actein API Gateway")

async def proxy(request: Request, target_url: str):
    async with httpx.AsyncClient() as client:
        url = f"{target_url}{request.url.path}"

        response = await client.request(
            method=request.method,
            url=url,
            headers=dict(request.headers),
            content=await request.body(),
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers),
    )

@app.get("/health")
def health():
    return {"status": "ok"}

@app.api_route("/public/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def public_proxy(request: Request):
    return await proxy(request, PUBLIC_SERVICE_URL)