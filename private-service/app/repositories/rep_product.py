from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.mod_category_product import CategoryProduct
from app.models.mod_product import Product


def _build_search_filter(search: str | None) -> list:
    if not search:
        return []
    clean_search = search.strip().lower()
    return [
        or_(
            Product.name.ilike(f'%{clean_search}%'),
            # Product.specifications.ilike(f'%{clean_search}%')
        )
    ]


def _build_filters(search: str | None, category_id: int | None, brand: str | None, is_active: bool | None) -> list:
    filters = _build_search_filter(search)
    if category_id is not None:
        filters.append(Product.category_id == category_id)
    if brand:
        filters.append(Product.brand.ilike(brand))
    if is_active is not None:
        filters.append(Product.is_active == is_active)
    return filters


def rep_get_products(
    db: Session, search: str | None, limit: int, offset: int, category_id: int | None, brand: str | None, is_active: bool | None
):
    filters_ = _build_filters(search, category_id, brand, is_active)
    query = (
        select(
            Product.id,
            Product.name,
            Product.brand,
            Product.is_active,
            CategoryProduct.id.label('category_id'),
            CategoryProduct.name.label('category_name'),
        )
        .join(CategoryProduct, Product.category_id == CategoryProduct.id, isouter=True)
        .where(*filters_)
        .order_by(Product.name)
        .limit(limit)
        .offset(offset)
    )
    return db.execute(query).all()


def rep_count_products(db: Session, search: str | None, category_id: int | None, brand: str | None, is_active: bool | None) -> int:
    filters_ = _build_filters(search, category_id, brand, is_active)

    query = select(func.count()).select_from(Product).where(*filters_)
    return db.execute(query).scalar()


def rep_get_product_by_id(db: Session, id: int):
    query = select(Product).where(Product.id == id)
    return db.execute(query).scalars().first()


def rep_get_product_by_sku(db: Session, sku: str, exclude_id: int | None = None):
    filter_id = [] if exclude_id is None else [Product.id != exclude_id]
    query = select(Product).where(Product.sku == sku, *filter_id)
    return db.execute(query).scalars().first()


def rep_create_product(
    db: Session,
    sku: str | None,
    name: str,
    description: str | None,
    category_id: int | None,
    brand: str,
    specifications: str | None,
    requires_installation: bool | None,
    maintenance_time: int | None,
):
    new_product = Product(
        sku=sku,
        name=name,
        description=description,
        category_id=category_id,
        brand=brand,
        specifications=specifications,
        requires_installation=requires_installation,
        maintenance_time=maintenance_time,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def rep_modify_product(db: Session, product: Product, fields: dict):
    for field, value in fields.items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product
