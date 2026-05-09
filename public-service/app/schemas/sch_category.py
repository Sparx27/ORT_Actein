from pydantic import BaseModel, ConfigDict, Field

class SchCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str = Field(validation_alias='nombre')