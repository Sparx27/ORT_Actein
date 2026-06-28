from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.config.settings import settings

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm


def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token inválido o expirado')
