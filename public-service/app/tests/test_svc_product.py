import math
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_product import svc_get_product_by_id, svc_get_products

LIMIT = 12

# ─── helpers ──────────────────────────────────────────────────────────────────


def make_fake_brand(name: str) -> MagicMock:
    """Crea un mock de fila de BD con atributo .brand"""
    m = MagicMock()
    m.brand = name
    return m


# ─── svc_get_products ─────────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_returns_correct_structure(mock_products, mock_count, mock_categories, mock_brands):
    """Verifica que la respuesta contiene todas las claves esperadas con valores correctos"""
    db = MagicMock()
    fake_products = [MagicMock(), MagicMock()]
    fake_categories = [MagicMock()]
    fake_brands = [make_fake_brand('Daikin'), make_fake_brand('LG')]

    mock_products.return_value = fake_products
    mock_count.return_value = 25
    mock_categories.return_value = fake_categories
    mock_brands.return_value = fake_brands

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=None)

    assert result['products'] == fake_products
    assert result['total_products'] == 25
    assert result['page'] == 1
    assert result['total_pages'] == math.ceil(25 / LIMIT)
    assert result['filters']['categories'] == fake_categories
    assert result['filters']['brands'] == ['Daikin', 'LG']


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_calculates_offset_correctly(mock_products, mock_count, mock_categories, mock_brands):
    """Verifica que el offset enviado al repo es (page - 1) * LIMIT"""
    db = MagicMock()
    mock_products.return_value = []
    mock_count.return_value = 0
    mock_categories.return_value = []
    mock_brands.return_value = []

    svc_get_products(db, page=3, search=None, category_id=None, brand=None, requires_installation=None)

    _, _, limit, offset, _, _, _ = mock_products.call_args[0]
    assert offset == (3 - 1) * LIMIT
    assert limit == LIMIT


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_total_pages_minimum_one_when_no_products(mock_products, mock_count, mock_categories, mock_brands):
    """Con 0 productos el total de páginas debe ser 1, no 0"""
    db = MagicMock()
    mock_products.return_value = []
    mock_count.return_value = 0
    mock_categories.return_value = []
    mock_brands.return_value = []

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=None)

    assert result['total_pages'] == 1


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_total_pages_with_150_products(mock_products, mock_count, mock_categories, mock_brands):
    """Con 150 productos y LIMIT=12, deben calcularse 13 páginas (ceil(150/12))"""
    db = MagicMock()
    mock_products.return_value = [MagicMock() for _ in range(LIMIT)]
    mock_count.return_value = 150
    mock_categories.return_value = []
    mock_brands.return_value = []

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=None)

    assert result['total_products'] == 150
    assert result['total_pages'] == math.ceil(150 / LIMIT)  # 13


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_total_pages_exact_multiple_of_limit(mock_products, mock_count, mock_categories, mock_brands):
    """Con 120 productos (múltiplo exacto de 12), el total debe ser 10 páginas exactas"""
    db = MagicMock()
    mock_products.return_value = [MagicMock() for _ in range(LIMIT)]
    mock_count.return_value = 120
    mock_categories.return_value = []
    mock_brands.return_value = []

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=None)

    assert result['total_pages'] == 10


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_last_page_with_partial_results(mock_products, mock_count, mock_categories, mock_brands):
    """Página 13 con 150 productos devuelve 6 productos (150 - 12*12)"""
    db = MagicMock()
    mock_products.return_value = [MagicMock() for _ in range(6)]
    mock_count.return_value = 150
    mock_categories.return_value = []
    mock_brands.return_value = []

    result = svc_get_products(db, page=13, search=None, category_id=None, brand=None, requires_installation=None)

    assert result['page'] == 13
    assert result['total_pages'] == 13
    assert len(result['products']) == 6


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_raises_500_on_db_error(mock_products, mock_count, mock_categories, mock_brands):
    """Un error de BD en rep_get_products debe propagarse como HTTP 500"""
    db = MagicMock()
    mock_products.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=None)

    assert exc.value.status_code == 500


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_forwards_requires_installation_to_repo(mock_products, mock_count, mock_categories, mock_brands):
    """El filtro requires_installation se reenvía al repo en la posición esperada"""
    db = MagicMock()
    mock_products.return_value = []
    mock_count.return_value = 0
    mock_categories.return_value = []
    mock_brands.return_value = []

    svc_get_products(db, page=1, search=None, category_id=None, brand=None, requires_installation=True)

    # rep_get_products(db, search, LIMIT, offset, category_id, brand, requires_installation)
    args = mock_products.call_args[0]
    assert args[6] is True


# ─── svc_get_product_by_id ────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_returns_product_when_found(mock_rep):
    """Devuelve el producto cuando el repo lo encuentra"""
    db = MagicMock()
    fake_product = MagicMock()
    mock_rep.return_value = fake_product

    result = svc_get_product_by_id(db, product_id=1)

    assert result == fake_product


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_raises_404_when_not_found(mock_rep):
    """Lanza HTTP 404 cuando el repo devuelve None (producto inexistente)"""
    db = MagicMock()
    mock_rep.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_get_product_by_id(db, product_id=99)

    assert exc.value.status_code == 404


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_raises_500_on_db_error(mock_rep):
    """Un error de BD debe propagarse como HTTP 500"""
    db = MagicMock()
    mock_rep.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_product_by_id(db, product_id=1)

    assert exc.value.status_code == 500
