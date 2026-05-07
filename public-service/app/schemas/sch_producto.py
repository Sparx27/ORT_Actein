from pydantic import BaseModel, ConfigDict
from app.schemas.sch_Categoria import schCategoria

class schProductoLista(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    categoria_nombre: str | None = None
    marca: str

class schFiltrosProducto(BaseModel):
    categorias: list[schCategoria]
    marcas: list[str]
