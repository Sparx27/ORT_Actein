from pydantic import BaseModel, EmailStr


class SchAppUser(BaseModel):
    email: EmailStr
    password: str


class SchLoginResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class SchSessionData(BaseModel):
    id: int
    email: EmailStr
    role: str
