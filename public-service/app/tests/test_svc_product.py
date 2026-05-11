import pytest
import math
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_product import svc_get_products, svc_get_filters, svc_get_product_by_id

LIMIT = 12

# ─── svc_get_products ────────────────────────────────────────────────────────

@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_returns_correct_structure(mock_rep_products, mock_rep_count):
    db = MagicMock()
    fake_products = [MagicMock(), MagicMock()]
    mock_rep_products.return_value = fake_products
    mock_rep_count.return_value = 25

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None)

    assert result['products'] == fake_products
    assert result['total_products'] == 25
    assert result['page'] == 1
    assert result['total_pages'] == math.ceil(25 / LIMIT)


@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_calculates_offset_correctly(mock_rep_products, mock_rep_count):
    db = MagicMock()
    mock_rep_products.return_value = []
    mock_rep_count.return_value = 0

    svc_get_products(db, page=3, search=None, category_id=None, brand=None)

    _, _, limit, offset, _, _ = mock_rep_products.call_args[0]
    assert offset == (3 - 1) * LIMIT
    assert limit == LIMIT


@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_total_pages_minimum_one_when_no_products(mock_rep_products, mock_rep_count):
    db = MagicMock()
    mock_rep_products.return_value = []
    mock_rep_count.return_value = 0

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None)

    assert result['total_pages'] == 1


@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_raises_500_on_db_error(mock_rep_products, mock_rep_count):
    db = MagicMock()
    mock_rep_products.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_products(db, page=1, search=None, category_id=None, brand=None)

    assert exc.value.status_code == 500


# ─── svc_get_filters ─────────────────────────────────────────────────────────

@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
def test_get_filters_returns_categories_and_brands(mock_rep_categories, mock_rep_brands):
    db = MagicMock()
    fake_category = MagicMock()
    fake_brand = MagicMock()
    fake_brand.marca = 'Samsung'
    mock_rep_categories.return_value = [fake_category]
    mock_rep_brands.return_value = [fake_brand]

    result = svc_get_filters(db, search=None)

    assert result['categories'] == [fake_category]
    assert result['brands'] == ['Samsung']


@patch('app.services.svc_product.rep_get_brands')
@patch('app.services.svc_product.rep_get_categories_with_products')
def test_get_filters_raises_500_on_db_error(mock_rep_categories, mock_rep_brands):
    db = MagicMock()
    mock_rep_categories.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_filters(db, search=None)

    assert exc.value.status_code == 500


# ─── svc_get_product_by_id ───────────────────────────────────────────────────

@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_returns_product_when_found(mock_rep):
    db = MagicMock()
    fake_product = MagicMock()
    mock_rep.return_value = fake_product

    result = svc_get_product_by_id(db, product_id=1)

    assert result == fake_product


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_raises_404_when_not_found(mock_rep):
    db = MagicMock()
    mock_rep.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_get_product_by_id(db, product_id=99)

    assert exc.value.status_code == 404


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_raises_500_on_db_error(mock_rep):
    db = MagicMock()
    mock_rep.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_product_by_id(db, product_id=1)

    assert exc.value.status_code == 500