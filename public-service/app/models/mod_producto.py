from app.config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey, Boolean, Text, DateTime
from datetime import datetime
from typing import Optional

class Producto(Base):
    __tablename__ = 'producto'
    __table_args__ = {'schema':'public'}

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[Optional[str]] = mapped_column(String(255), unique=True)
    nombre: Mapped[str] = mapped_column(String(255))
    categoria_id: Mapped[Optional[int]] = mapped_column(ForeignKey('public.categoria_producto.id'))
    marca: Mapped[str] = mapped_column(String(255))
    especificaciones: Mapped[Optional[str]] = mapped_column(Text)
    instalacion: Mapped[Optional[bool]]= mapped_column(Boolean)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    creado: Mapped[datetime] = mapped_column(DateTime)