from pydantic import BaseModel, ConfigDict


class SchCategoriaProducto(BaseModel):
  model_config = ConfigDict(from_attributes=True)

  id: int
  nombre: str
  dsc: str | None = None