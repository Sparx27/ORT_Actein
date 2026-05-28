from app.config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, ForeignKey, Boolean, Integer, DateTime
from datetime import datetime


class Product(Base):
    __tablename__ = 'product'
    __table_args__ = {'schema' : 'private'}

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str | None] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    category_id: Mapped[int | None] = mapped_column(ForeignKey('private.product_category.id'))
    brand: Mapped[str] = mapped_column(String(255))
    specifications: Mapped[str | None] = mapped_column(Text)
    requires_installation: Mapped[bool | None] = mapped_column(Boolean)
    maintenance_time: Mapped[int | None] = mapped_column(Integer)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime)