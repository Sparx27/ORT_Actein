from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.mod_app_user import AppUser


def rep_get_user_by_email(db: Session, email: str):
    query = select(AppUser).where(AppUser.email == email)
    return db.execute(query).scalar_one_or_none()
