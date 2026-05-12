import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.services.svc_category_product import svc_get_category_product


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_returns_category_list(mock_rep):
    db = MagicMock()
    fake_categories = [MagicMock(), MagicMock()]
    mock_rep.return_value = fake_categories

    result = svc_get_category_product(db)

    assert result == fake_categories


@patch('app.services.svc_category_product.rep_get_categories')
def test_get_categories_raises_500_on_db_error(mock_rep):
    db = MagicMock()
    mock_rep.side_effect = SQLAlchemyError()

    with pytest.raises(HTTPException) as exc:
        svc_get_category_product(db)

    assert exc.value.status_code == 500