from pydantic import BaseModel, ConfigDict, Field


class SchCategoryProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    is_active: bool


class SchCategoryProductRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, min_length=1, max_length=1000)


class SchCategoryPaginated(BaseModel):
    total: int
    page: int
    total_pages: int
    categories: list[SchCategoryProduct]


class SchCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
