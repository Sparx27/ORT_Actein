from pydantic import BaseModel, ConfigDict, Field

class SchCategoryProduct(BaseModel):
  model_config = ConfigDict(from_attributes=True)

  id: int
  name: str = Field(validation_alias='nombre')
  description: str | None = Field(default=None, validation_alias='dsc')