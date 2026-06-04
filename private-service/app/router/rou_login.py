from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.services.svc_app_user import svc_login
from app.schemas.sch_app_user import SchAppUser

login_router = APIRouter()

@login_router.post('/login', )
def login(db: Session = Depends(get_db), data: SchAppUser = Body(...)):
  return svc_login(db,data.email, data.password)