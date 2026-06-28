from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_category_product import svc_get_category_product


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_returns_category_list(mock_rep):
    """Devuelve la lista de categorías que retorna el repo"""
    db = MagicMock()
    fake_categories = [MagicMock(), MagicMock()]
    mock_rep.return_value = fake_categories

    result = svc_get_category_product(db)

    assert result == fake_categories


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_returns_empty_list_when_no_categories(mock_rep):
    """Devuelve lista vacía sin lanzar error cuando no hay categorías"""
    db = MagicMock()
    mock_rep.return_value = []

    result = svc_get_category_product(db)

    assert result == []


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_calls_repo_once_with_db(mock_rep):
    """Verifica que el repo se invoca exactamente una vez y recibe la sesión de BD"""
    db = MagicMock()
    mock_rep.return_value = []

    svc_get_category_product(db)

    mock_rep.assert_called_once_with(db)


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_raises_500_on_db_error(mock_rep):
    """Un error de BD debe propagarse como HTTP 500"""
    db = MagicMock()
    mock_rep.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_category_product(db)

    assert exc.value.status_code == 500
