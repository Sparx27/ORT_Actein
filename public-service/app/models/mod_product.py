from app.config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey, Boolean, Text

class Product(Base):
    __tablename__ = 'product'
    __table_args__ = {'schema':'public'}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    category_id: Mapped[int | None] = mapped_column(ForeignKey('public.product_category.id'))
    brand: Mapped[str] = mapped_column(String(255))
    specifications: Mapped[str | None] = mapped_column(Text)
    requires_installation: Mapped[bool | None]= mapped_column(Boolean)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)