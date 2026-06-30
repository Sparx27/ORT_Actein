from typing import Annotated, Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    environment: Literal['dev', 'prod'] = 'dev'
    auth_service_url: str
    private_service_url: str
    public_service_url: str
    secret_key: str
    algorithm: str = 'HS256'
    cors_origins: Annotated[list[str], NoDecode] = []

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    @field_validator('cors_origins', mode='before')
    @classmethod
    def split_cors_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(',') if origin.strip()]
        return value

    @property
    def is_prod(self) -> bool:
        return self.environment == 'prod'

    @property
    def is_dev(self) -> bool:
        return self.environment == 'dev'


settings = Settings()
