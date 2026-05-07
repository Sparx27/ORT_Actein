from pydantic import BaseModel, ConfigDict

class schCategoria(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    nombre: str