from fastapi import APIRouter, Body, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.sch_app_user import SchAppUser, SchLoginResponse, SchSessionData
from app.services.svc_auth import svc_login, svc_validate_session

login_router = APIRouter()
security = HTTPBearer()


@login_router.post('/login', response_model=SchLoginResponse)
def login(data: SchAppUser = Body(...), db: Session = Depends(get_db)):
    return svc_login(db, data.email, data.password)


@login_router.get('/validate', response_model=SchSessionData)
def validate(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return svc_validate_session(credentials.credentials)
