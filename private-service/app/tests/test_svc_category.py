from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_category_product import (
    svc_create_category,
    svc_get_categories,
    svc_get_category_by_id,
    svc_modify_category,
    svc_update_category_status,
)

LIMIT = 12


# ─── svc_get_categories ───────────────────────────────────────────────────────


@patch('app.services.svc_category_product.rep_count_categories')
@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_returns_pagination_structure(mock_get, mock_count):
    """Devuelve la estructura de build_pagination con la clave 'categories'"""
    db = MagicMock()
    fake = [MagicMock()]
    mock_get.return_value = fake
    mock_count.return_value = 5

    result = svc_get_categories(db, page=1, search=None, is_active=None)

    assert result['total'] == 5
    assert result['categories'] == fake
    assert result['total_pages'] == 1


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_raises_500_on_db_error(mock_get):
    db = MagicMock()
    mock_get.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_categories(db, page=1, search=None, is_active=None)

    assert exc.value.status_code == 500


# ─── svc_create_category ──────────────────────────────────────────────────────


@patch('app.services.svc_category_product.rep_create_category')
@patch('app.services.svc_category_product.rep_get_category_by_name')
def test_create_category_success(mock_get_name, mock_create):
    db = MagicMock()
    mock_get_name.return_value = None  # nombre libre
    mock_create.return_value = {'id': 1, 'name': 'Splits'}

    result = svc_create_category(db, 'Splits', 'desc')

    assert result == {'id': 1, 'name': 'Splits'}
    mock_create.assert_called_once_with(db, 'Splits', 'desc')


@patch('app.services.svc_category_product.rep_get_category_by_name')
def test_create_category_raises_409_when_name_duplicated(mock_get_name):
    db = MagicMock()
    mock_get_name.return_value = MagicMock()  # ya existe

    with pytest.raises(HTTPException) as exc:
        svc_create_category(db, 'Splits', 'desc')

    assert exc.value.status_code == 409


# ─── svc_modify_category ──────────────────────────────────────────────────────


@patch('app.services.svc_category_product.rep_modify_category')
@patch('app.services.svc_category_product.rep_get_category_by_name')
@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_modify_category_success(mock_get_id, mock_get_name, mock_modify):
    db = MagicMock()
    existing = MagicMock()
    mock_get_id.return_value = existing
    mock_get_name.return_value = None
    mock_modify.return_value = {'id': 1, 'name': 'Nuevo'}

    result = svc_modify_category(db, 1, 'Nuevo', 'desc')

    assert result == {'id': 1, 'name': 'Nuevo'}
    mock_modify.assert_called_once_with(db, existing, 'Nuevo', 'desc')


@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_modify_category_raises_404_when_not_found(mock_get_id):
    db = MagicMock()
    mock_get_id.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_modify_category(db, 99, 'Nuevo', 'desc')

    assert exc.value.status_code == 404


@patch('app.services.svc_category_product.rep_get_category_by_name')
@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_modify_category_validates_existence_before_uniqueness(mock_get_id, mock_get_name):
    """Convención: 404 (existencia) antes que 409 (unicidad de nombre)"""
    db = MagicMock()
    mock_get_id.return_value = None  # no existe
    mock_get_name.return_value = MagicMock()  # nombre duplicado (no debería chequearse)

    with pytest.raises(HTTPException) as exc:
        svc_modify_category(db, 99, 'Nuevo', 'desc')

    assert exc.value.status_code == 404
    mock_get_name.assert_not_called()


# ─── svc_update_category_status ───────────────────────────────────────────────


@patch('app.services.svc_category_product.rep_update_category_status')
@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_update_category_status_success_activating(mock_get_id, mock_update):
    db = MagicMock()
    category = MagicMock()
    category.is_active = False
    mock_get_id.return_value = category
    mock_update.return_value = category

    svc_update_category_status(db, 1, True)  # activar

    mock_update.assert_called_once_with(db, category, True)


@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_update_category_status_raises_404_when_not_found(mock_get_id):
    db = MagicMock()
    mock_get_id.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_update_category_status(db, 99, True)

    assert exc.value.status_code == 404


@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_update_category_status_raises_422_when_same_state(mock_get_id):
    db = MagicMock()
    category = MagicMock()
    category.is_active = True
    mock_get_id.return_value = category

    with pytest.raises(HTTPException) as exc:
        svc_update_category_status(db, 1, True)  # ya activa

    assert exc.value.status_code == 422


@patch('app.services.svc_category_product.rep_exists_active_product_in_category')
@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_update_category_status_raises_422_when_deactivating_with_active_products(mock_get_id, mock_exists):
    db = MagicMock()
    category = MagicMock()
    category.is_active = True
    mock_get_id.return_value = category
    mock_exists.return_value = True  # tiene productos activos

    with pytest.raises(HTTPException) as exc:
        svc_update_category_status(db, 1, False)  # desactivar

    assert exc.value.status_code == 422
    assert 'productos activos' in exc.value.detail


# ─── svc_get_category_by_id ───────────────────────────────────────────────────


@patch('app.services.svc_category_product.rep_get_category_by_id')
def test_get_category_by_id_raises_404_when_not_found(mock_get_id):
    db = MagicMock()
    mock_get_id.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_get_category_by_id(db, 99)

    assert exc.value.status_code == 404
