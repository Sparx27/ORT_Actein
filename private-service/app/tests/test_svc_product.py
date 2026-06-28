import math
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_product import (
    svc_create_product,
    svc_get_product_by_id,
    svc_get_product_detail_by_id,
    svc_get_products,
    svc_modify_product,
    svc_update_status,
)

LIMIT = 12


# ─── svc_get_products ─────────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_returns_pagination_structure(mock_get, mock_count):
    """Devuelve la estructura de build_pagination con la clave 'products'"""
    db = MagicMock()
    fake_products = [MagicMock(), MagicMock()]
    mock_get.return_value = fake_products
    mock_count.return_value = 30

    result = svc_get_products(db, page=1, search=None, category_id=None, brand=None, is_active=None)

    assert result['total'] == 30
    assert result['page'] == 1
    assert result['total_pages'] == math.ceil(30 / LIMIT)
    assert result['products'] == fake_products


@patch('app.services.svc_product.rep_count_products')
@patch('app.services.svc_product.rep_get_products')
def test_get_products_calculates_offset(mock_get, mock_count):
    """El offset enviado al repo es (page - 1) * LIMIT"""
    db = MagicMock()
    mock_get.return_value = []
    mock_count.return_value = 0

    svc_get_products(db, page=3, search=None, category_id=None, brand=None, is_active=None)

    # rep_get_products(db, search, LIMIT, offset, category_id, brand, is_active)
    args = mock_get.call_args[0]
    assert args[2] == LIMIT
    assert args[3] == (3 - 1) * LIMIT


@patch('app.services.svc_product.rep_get_products')
def test_get_products_raises_500_on_db_error(mock_get):
    """Un error de BD se propaga como HTTP 500"""
    db = MagicMock()
    mock_get.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_products(db, page=1, search=None, category_id=None, brand=None, is_active=None)

    assert exc.value.status_code == 500


# ─── svc_get_product_by_id ────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_returns_when_found(mock_rep):
    db = MagicMock()
    fake_product = MagicMock()
    mock_rep.return_value = fake_product

    assert svc_get_product_by_id(db, 1) == fake_product


@patch('app.services.svc_product.rep_get_product_by_id')
def test_get_product_by_id_raises_404_when_not_found(mock_rep):
    db = MagicMock()
    mock_rep.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_get_product_by_id(db, 99)

    assert exc.value.status_code == 404


@patch('app.services.svc_product.rep_get_product_detail_by_id')
def test_get_product_detail_raises_404_when_not_found(mock_rep):
    db = MagicMock()
    mock_rep.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_get_product_detail_by_id(db, 99)

    assert exc.value.status_code == 404


# ─── svc_create_product ───────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_create_product')
@patch('app.services.svc_product.rep_get_product_by_sku')
@patch('app.services.svc_product.rep_get_category_by_id')
def test_create_product_success_without_category_or_sku(mock_get_cat, mock_get_sku, mock_create):
    """Sin category_id ni sku no se valida nada extra y se persiste"""
    db = MagicMock()
    product = MagicMock()
    product.category_id = None
    product.sku = None
    product.model_dump.return_value = {'name': 'Aire X'}
    mock_create.return_value = {'id': 1, 'name': 'Aire X'}

    result = svc_create_product(db, product)

    assert result == {'id': 1, 'name': 'Aire X'}
    mock_create.assert_called_once_with(db, {'name': 'Aire X'})
    mock_get_cat.assert_not_called()
    mock_get_sku.assert_not_called()


@patch('app.services.svc_product.rep_get_category_by_id')
def test_create_product_raises_404_when_category_not_found(mock_get_cat):
    db = MagicMock()
    product = MagicMock()
    product.category_id = 99
    mock_get_cat.return_value = None  # validate_exists real → 404

    with pytest.raises(HTTPException) as exc:
        svc_create_product(db, product)

    assert exc.value.status_code == 404


@patch('app.services.svc_product.rep_get_category_by_id')
def test_create_product_raises_409_when_category_inactive(mock_get_cat):
    db = MagicMock()
    product = MagicMock()
    product.category_id = 5
    category = MagicMock()
    category.is_active = False
    mock_get_cat.return_value = category

    with pytest.raises(HTTPException) as exc:
        svc_create_product(db, product)

    assert exc.value.status_code == 409


@patch('app.services.svc_product.rep_get_product_by_sku')
@patch('app.services.svc_product.rep_get_category_by_id')
def test_create_product_raises_409_when_sku_duplicated(mock_get_cat, mock_get_sku):
    db = MagicMock()
    product = MagicMock()
    product.category_id = None
    product.sku = 'SKU123'
    mock_get_sku.return_value = MagicMock()  # ya existe

    with pytest.raises(HTTPException) as exc:
        svc_create_product(db, product)

    assert exc.value.status_code == 409


@patch('app.services.svc_product.rep_get_product_by_sku')
@patch('app.services.svc_product.rep_get_category_by_id')
def test_create_product_validates_category_before_sku(mock_get_cat, mock_get_sku):
    """Convención: existencia (404 categoría) antes que unicidad (409 sku)"""
    db = MagicMock()
    product = MagicMock()
    product.category_id = 99
    product.sku = 'SKU123'
    mock_get_cat.return_value = None  # categoría inexistente
    mock_get_sku.return_value = MagicMock()  # sku duplicado (no debería chequearse)

    with pytest.raises(HTTPException) as exc:
        svc_create_product(db, product)

    assert exc.value.status_code == 404
    mock_get_sku.assert_not_called()


# ─── svc_modify_product ───────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_modify_product')
@patch('app.services.svc_product.rep_get_product_by_id')
def test_modify_product_success(mock_get_prod, mock_modify):
    db = MagicMock()
    existing = MagicMock()
    mock_get_prod.return_value = existing
    body = MagicMock()
    body.category_id = None
    body.sku = None
    body.model_dump.return_value = {'name': 'Nuevo'}
    mock_modify.return_value = {'id': 1, 'name': 'Nuevo'}

    result = svc_modify_product(db, 1, body)

    assert result == {'id': 1, 'name': 'Nuevo'}
    mock_modify.assert_called_once_with(db, existing, {'name': 'Nuevo'})


@patch('app.services.svc_product.rep_get_product_by_id')
def test_modify_product_raises_404_when_not_found(mock_get_prod):
    db = MagicMock()
    mock_get_prod.return_value = None
    body = MagicMock()

    with pytest.raises(HTTPException) as exc:
        svc_modify_product(db, 99, body)

    assert exc.value.status_code == 404


# ─── svc_update_status ────────────────────────────────────────────────────────


@patch('app.services.svc_product.rep_modify_product')
@patch('app.services.svc_product.rep_get_product_by_id')
def test_update_status_success(mock_get, mock_modify):
    db = MagicMock()
    product = MagicMock()
    product.is_active = True
    mock_get.return_value = product
    status = MagicMock()
    status.is_active = False
    status.model_dump.return_value = {'is_active': False}
    mock_modify.return_value = product

    svc_update_status(db, 1, status)

    mock_modify.assert_called_once_with(db, product, {'is_active': False})


@patch('app.services.svc_product.rep_get_product_by_id')
def test_update_status_raises_422_when_same_state(mock_get):
    db = MagicMock()
    product = MagicMock()
    product.is_active = True
    mock_get.return_value = product
    status = MagicMock()
    status.is_active = True  # mismo estado

    with pytest.raises(HTTPException) as exc:
        svc_update_status(db, 1, status)

    assert exc.value.status_code == 422


@patch('app.services.svc_product.rep_get_product_by_id')
def test_update_status_raises_404_when_not_found(mock_get):
    db = MagicMock()
    mock_get.return_value = None
    status = MagicMock()
    status.is_active = False

    with pytest.raises(HTTPException) as exc:
        svc_update_status(db, 99, status)

    assert exc.value.status_code == 404
