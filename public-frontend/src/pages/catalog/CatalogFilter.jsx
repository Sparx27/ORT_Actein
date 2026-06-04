import { useState } from 'react'
import ContentBox from '../../shared_components/ContentBox'
import useProducts from '../../hooks/useProducts'
import useCatalogParams from '../../hooks/useCatalogParams'
import Button from '../../shared_components/Button'


const CatalogFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentParams, setCurrentParams } = useCatalogParams()
  const { productsQuery } = useProducts({ ...currentParams })

  return (
    <div className="catalog-filter-form-wrap">
      {/* TOGGLE BTN FOR MOBILE*/}
      <button
        className={`catalog-filter-form-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="catalog-filter-form-toggle-btn-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="11" y1="18" x2="13" y2="18"></line>
          </svg>
          <p>Filtros</p>
        </span>
        <svg
          className="catalog-filter-form-filter-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <ContentBox design={`filter-form-wrap ${!isOpen ? 'collapsed' : ''}`}>
        <aside>
          <div className="catalog-filter-header">
            <h2 className="catalog-filter-title">Filtrar por</h2>
            <button
              className="catalog-filter-clear-btn"
              onClick={() => setCurrentParams({})}
            >Limpiar</button>
          </div>

          <div className="catalog-filter-group">
            <span className="catalog-filter-group-label">Categoría</span>
            <select
              className="catalog-filter-select"
              value={currentParams?.category_id ?? ''}
              onChange={(e) => setCurrentParams({ ...currentParams, category_id: e.target.value })}
            >
              <option value="">Todas las categorías</option>
              {
                productsQuery.data?.filters?.categories && (
                  productsQuery.data.filters.categories.map(cat => <option key={`cat-${cat.id}`} value={cat.id}>{cat.name}</option>)
                )
              }
            </select>
          </div>

          <div className="catalog-filter-group">
            <span className="catalog-filter-group-label">Marca</span>
            <select
              className="catalog-filter-select"
              value={currentParams?.brand ?? ''}
              onChange={(e) => setCurrentParams({ ...currentParams, brand: e.target.value })}
            >
              <option value="">Todas las marcas</option>
              {
                productsQuery.data?.filters?.brands && (
                  productsQuery.data.filters.brands.map(b => <option key={`b-${b}`} value={b}>{b}</option>)
                )
              }
            </select>
          </div>

          <div className="catalog-filter-group">
            <span className="catalog-filter-group-label">Instalación</span>
            <div className="catalog-filter-radio-group">
              <label className="catalog-filter-radio-item">
                <input type="radio" name="instalacion" defaultChecked />
                Todos
              </label>
              <label className="catalog-filter-radio-item">
                <input type="radio" name="instalacion" />
                Requiere instalación
              </label>
              <label className="catalog-filter-radio-item">
                <input type="radio" name="instalacion" />
                Sin instalación requerida
              </label>
            </div>
          </div>
        </aside>
      </ContentBox>
    </div>
  )
}

export default CatalogFilter