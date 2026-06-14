from pydantic import BaseModel, EmailStr


class SchAppUser(BaseModel):
    email: EmailStr
    password: str


class SchLoginResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
