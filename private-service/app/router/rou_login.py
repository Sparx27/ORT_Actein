from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.sch_app_user import SchAppUser, SchLoginResponse
from app.services.svc_auth import svc_login

login_router = APIRouter()


@login_router.post('/login', response_model=SchLoginResponse)
def login(data: SchAppUser = Body(...), db: Session = Depends(get_db)):
    return svc_login(db, data.email, data.password)
