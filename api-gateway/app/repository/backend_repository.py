import httpx


async def forward_request(method: str, url: str, params, headers: dict, content: bytes) -> httpx.Response:
    async with httpx.AsyncClient() as client:
        return await client.request(
            method=method,
            url=url,
            params=params,
            headers=headers,
            content=content,
        )
