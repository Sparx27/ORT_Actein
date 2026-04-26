from pydantic import BaseModel


class SchCategoriaProducto(BaseModel):
  id: int
  nombre: str
  dsc: str | None

  class Config:
    from_attributes = True