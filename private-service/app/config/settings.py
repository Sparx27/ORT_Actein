from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    secret_key: str
    algorithm: str = 'HS256'
    expire_minutes: int = 480
    db_uri: str

    class Config:
        env_file = '.env'


settings = Settings()