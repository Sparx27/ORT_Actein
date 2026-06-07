from pydantic import BaseModel, ConfigDict

class SchCategoryProduct(BaseModel):
    model_config= ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    is_active: bool 

class SchCategoryProductRequest(BaseModel):
    model_config= ConfigDict(from_attributes=True)

    name: str
    description: str | None

class SchCategoryPaginated(BaseModel):
    total_categories : int
    page : int
    total_pages : int
    categories : list[SchCategoryProduct]
