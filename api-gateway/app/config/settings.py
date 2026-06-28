from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    auth_service_url: str
    private_service_url: str
    public_service_url: str
    secret_key: str
    algorithm: str = 'HS256'

    class Config:
        env_file = '.env'


settings = Settings()
