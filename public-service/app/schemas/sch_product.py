from pydantic import BaseModel, ConfigDict
from app.schemas.sch_category_product import SchCategory

class SchProductList(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category_id: int | None = None
    category_name: str | None = None
    brand: str

class SchFiltersProduct(BaseModel):
    categories: list[SchCategory]
    brands: list[str]

class SchProductPaginated(BaseModel):
    total_products : int
    page : int
    total_pages : int
    products : list[SchProductList]
    filters : SchFiltersProduct

class SchProductDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str 
    description: str | None = None
    category_name: str | None = None
    category_id: int | None = None
    brand: str   
    specifications : str | None = None
    requires_installation : bool | None = None