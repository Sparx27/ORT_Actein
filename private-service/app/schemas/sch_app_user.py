from pydantic import BaseModel

class SchAppUser(BaseModel):
    email: str
    password: str