from typing import Any

from fastapi import HTTPException


def validate_exists(entity: Any, entity_name: str) -> Any:
    if entity is None:
        raise HTTPException(status_code=404, detail=f'{entity_name} no encontrado')
    return entity
