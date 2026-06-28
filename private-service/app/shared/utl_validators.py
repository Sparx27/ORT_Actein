from typing import Any

from fastapi import HTTPException


def validate_exists(entity: Any, entity_name: str) -> Any:
    if entity is None:
        raise HTTPException(status_code=404, detail=f'No se encontró: {entity_name}')
    return entity
