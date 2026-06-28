from datetime import datetime, timedelta, timezone

from jose import jwt

from app.config.settings import settings

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
EXPIRE_MINUTES = settings.expire_minutes


def create_token(data: dict) -> str:
    payload = data.copy()
    expiration = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_MINUTES)
    payload['exp'] = expiration
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
