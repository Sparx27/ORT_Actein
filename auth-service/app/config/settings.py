from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: Literal['dev', 'prod'] = 'dev'
    db_uri: str
    secret_key: str
    algorithm: str = 'HS256'
    expire_minutes: int = 480

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    @property
    def is_prod(self) -> bool:
        return self.environment == 'prod'

    @property
    def is_dev(self) -> bool:
        return self.environment == 'dev'


settings = Settings()
