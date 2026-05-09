from unittest.mock import MagicMock
from app.services.svc_product import svcGetProducts, svcGetFilters


# ── svcGetProductos ──────────────────────────────────────────

def test_svcGetProductos_sinBusqueda_devuelveProductos():
    db = MagicMock()
    productosFalsos = [
        MagicMock(id=1, nombre="Cámara BHT-12", marca="Bohn", categoria_nombre="Cámaras"),
        MagicMock(id=2, nombre="Cámara BHT-20", marca="Bohn", categoria_nombre="Cámaras"),
    ]
    db.execute.return_value.all.return_value = productosFalsos

    resultado = svcGetProductos(db, page=1, busqueda=None)

    assert resultado == productosFalsos
    assert len(resultado) == 2


def test_svcGetProductos_conBusqueda_devuelveProductosFiltrados():
    db = MagicMock()
    productosFiltrados = [
        MagicMock(id=1, nombre="Monitor 27", marca="LG", categoria_nombre="Monitores"),
    ]
    db.execute.return_value.all.return_value = productosFiltrados

    resultado = svcGetProductos(db, page=1, busqueda="monitor")

    assert resultado == productosFiltrados


def test_svcGetProductos_sinResultados_devuelveListaVacia():
    db = MagicMock()
    db.execute.return_value.all.return_value = []

    resultado = svcGetProductos(db, page=1, busqueda="xyznoexiste")

    assert resultado == []


def test_svcGetProductos_pagina2_ejecutaQuery():
    db = MagicMock()
    db.execute.return_value.all.return_value = []

    svcGetProductos(db, page=2, busqueda=None)

    assert db.execute.called


# ── svcGetFiltros ────────────────────────────────────────────

def test_svcGetFiltros_sinBusqueda_devuelveCategoríasYMarcas():
    db = MagicMock()
    categoriasFalsas = [
        MagicMock(id=1, nombre="Cámaras"),
        MagicMock(id=2, nombre="Equipos"),
    ]
    filasMarcas = [MagicMock(marca="Bohn"), MagicMock(marca="LG")]
    db.execute.return_value.all.side_effect = [categoriasFalsas, filasMarcas]

    resultado = svcGetFiltros(db, busqueda=None)

    assert resultado["categorias"] == categoriasFalsas
    assert resultado["marcas"] == ["Bohn", "LG"]


def test_svcGetFiltros_conBusqueda_devuelveFiltrados():
    db = MagicMock()
    categoriasFalsas = [MagicMock(id=1, nombre="Cámaras")]
    filasMarcas = [MagicMock(marca="Bohn")]
    db.execute.return_value.all.side_effect = [categoriasFalsas, filasMarcas]

    resultado = svcGetFiltros(db, busqueda="camara")

    assert resultado["categorias"] == categoriasFalsas
    assert resultado["marcas"] == ["Bohn"]


def test_svcGetFiltros_sinResultados_devuelveListasVacias():
    db = MagicMock()
    db.execute.return_value.all.side_effect = [[], []]

    resultado = svcGetFiltros(db, busqueda="xyznoexiste")

    assert resultado["categorias"] == []
    assert resultado["marcas"] == []