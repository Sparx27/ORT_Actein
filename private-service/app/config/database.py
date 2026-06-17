import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

load_dotenv()

engine = create_engine(os.getenv('DB_URI'), pool_pre_ping=True, pool_recycle=240)
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
