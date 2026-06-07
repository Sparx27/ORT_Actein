from app.config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, Text, Boolean
from datetime import datetime, timezone

class CategoryProduct(Base):
  __tablename__= 'product_category'
  __table_args__= {'schema': 'private'}

  id: Mapped[int] = mapped_column(primary_key=True)
  name: Mapped[str] = mapped_column(String(255))
  description: Mapped[str | None] = mapped_column(Text)
  is_active : Mapped[bool] = mapped_column(Boolean, default=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))