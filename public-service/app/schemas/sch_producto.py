from pydantic import BaseModel, ConfigDict

class schProductoLista(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    categoria_nombre: str | None = None
    marca: str
