from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException

from app.services.svc_auth import svc_login, svc_validate_session

# ─── svc_login ──────────────────────────────────────────────────────────────


@patch('app.services.svc_auth.rep_get_user_by_email')
def test_login_raises_401_when_user_not_found(mock_get_user):
    """Usuario inexistente → 401 Credenciales inválidas"""
    db = MagicMock()
    mock_get_user.return_value = None

    with pytest.raises(HTTPException) as exc:
        svc_login(db, 'nadie@test.com', 'pass')

    assert exc.value.status_code == 401
    assert exc.value.detail == 'Credenciales inválidas'


@patch('app.services.svc_auth.bcrypt')
@patch('app.services.svc_auth.rep_get_user_by_email')
def test_login_raises_401_when_password_invalid(mock_get_user, mock_bcrypt):
    """Contraseña incorrecta → 401 Credenciales inválidas"""
    db = MagicMock()
    user = MagicMock()
    user.is_active = True
    mock_get_user.return_value = user
    mock_bcrypt.checkpw.return_value = False

    with pytest.raises(HTTPException) as exc:
        svc_login(db, 'user@test.com', 'wrong')

    assert exc.value.status_code == 401
    assert exc.value.detail == 'Credenciales inválidas'


@patch('app.services.svc_auth.bcrypt')
@patch('app.services.svc_auth.rep_get_user_by_email')
def test_login_raises_401_when_user_inactive(mock_get_user, mock_bcrypt):
    """Usuario válido pero inactivo → 401 Credenciales inválidas"""
    db = MagicMock()
    user = MagicMock()
    user.is_active = False
    mock_get_user.return_value = user
    mock_bcrypt.checkpw.return_value = True  # password correcta, pero está inactivo

    with pytest.raises(HTTPException) as exc:
        svc_login(db, 'user@test.com', 'pass')

    assert exc.value.status_code == 401
    assert exc.value.detail == 'Credenciales inválidas'


@patch('app.services.svc_auth.create_token')
@patch('app.services.svc_auth.bcrypt')
@patch('app.services.svc_auth.rep_get_user_by_email')
def test_login_returns_token_on_success(mock_get_user, mock_bcrypt, mock_create_token):
    """Login correcto → devuelve access_token y token_type bearer"""
    db = MagicMock()
    user = MagicMock()
    user.id = 1
    user.email = 'user@test.com'
    user.role = 'ADMIN'
    user.is_active = True
    mock_get_user.return_value = user
    mock_bcrypt.checkpw.return_value = True
    mock_create_token.return_value = 'fake.jwt.token'

    result = svc_login(db, 'user@test.com', 'pass')

    assert result == {'access_token': 'fake.jwt.token', 'token_type': 'bearer'}
    mock_create_token.assert_called_once_with({'id': 1, 'email': 'user@test.com', 'role': 'ADMIN'})


# ─── svc_validate_session ─────────────────────────────────────────────────────


@patch('app.services.svc_auth.verify_token')
def test_validate_session_returns_payload(mock_verify):
    """Devuelve el payload que retorna verify_token"""
    fake_payload = {'id': 1, 'email': 'user@test.com', 'role': 'ADMIN'}
    mock_verify.return_value = fake_payload

    result = svc_validate_session('some.token')

    assert result == fake_payload
    mock_verify.assert_called_once_with('some.token')


@patch('app.services.svc_auth.verify_token')
def test_validate_session_propagates_invalid_token(mock_verify):
    """Si verify_token rechaza el token, el 401 se propaga"""
    mock_verify.side_effect = HTTPException(status_code=401, detail='Token inválido o expirado')

    with pytest.raises(HTTPException) as exc:
        svc_validate_session('bad.token')

    assert exc.value.status_code == 401
