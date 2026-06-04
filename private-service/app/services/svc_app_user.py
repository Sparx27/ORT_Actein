from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.rep_user_app import rep_get_user_by_email
import bcrypt
from app.auth.auth_handler import create_token
from app.models.mod_app_user import AppUser


def svc_login(db: Session, email : str, password: str):
    app_user = rep_get_user_by_email(db, email)
    if not app_user:
        raise HTTPException(status_code=401, detail='Credenciales inválidas')
    
    _verify_password(password, app_user.password_hash)
    _verify_active(app_user)

    token = create_token({'id':app_user.id, 'email': app_user.email, 'role': app_user.role})
    return token



def _verify_password(password: str, password_hash: str):
    if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail='Credenciales inválidas')

def _verify_active(app_user: AppUser):
    if not app_user.is_active:
        raise HTTPException(status_code=401, detail='Credenciales inválidas')