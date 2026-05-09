from pydantic import BaseModel, ConfigDict, Field
from app.schemas.sch_category import SchCategory

class SchProductList(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str = Field(validation_alias='nombre')
    category_name: str | None = None
    brand: str = Field(validation_alias='marca')

class SchFiltersProduct(BaseModel):
    categories: list[SchCategory]
    brands: list[str]
