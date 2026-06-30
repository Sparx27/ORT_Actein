from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config.settings import settings

engine = create_engine(settings.db_uri, pool_pre_ping=True, pool_recycle=240)
SqlSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SqlSession()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
