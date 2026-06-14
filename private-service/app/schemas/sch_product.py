from pydantic import BaseModel, ConfigDict, Field


class SchProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sku: str | None
    name: str
    description: str | None
    category_id: int | None
    brand: str
    specifications: str | None
    requires_installation: bool | None
    maintenance_time: int | None
    is_active: bool


class SchProductList(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category_id: int | None
    category_name: str | None
    brand: str
    is_active: bool


class SchProductPaginated(BaseModel):
    total: int
    page: int
    total_pages: int
    products: list[SchProductList]


class SchProductRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    sku: str | None = Field(max_length=255, default=None)
    name: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None)
    category_id: int | None = Field(gt=0, default=None)
    brand: str = Field(min_length=1, max_length=255)
    specifications: str | None = Field(default=None)
    requires_installation: bool | None = Field(default=None)
    maintenance_time: int | None = Field(gt=0, default=None)


class SchProductStatusUpdate(BaseModel):
    is_active: bool


class SchProductDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None = None
    category_name: str | None = None
    category_id: int | None = None
    brand: str
    specifications: str | None = None
    requires_installation: bool | None = None
