from app.config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime
from datetime import datetime

class CategoryProduct(Base):
  __tablename__= 'categoria_producto'
  __table_args__= {'schema': 'public'}

  id: Mapped[int] = mapped_column(primary_key=True)
  nombre: Mapped[str] = mapped_column(String(255))
  dsc: Mapped[str | None] = mapped_column(String(1000))
  creado: Mapped[datetime] = mapped_column(DateTime)