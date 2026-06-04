import { useState } from 'react'

const CatalogForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="aform-wrap">

      {/* TOGGLE BTN FOR MOVILE*/}
      <button
        className={`aform-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="aform-toggle-btn-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="11" y1="18" x2="13" y2="18"></line>
          </svg>
          <p>Filtros</p>
        </span>
        <svg
          className="aform-filter-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <aside className={`filter-form-wrap ${!isOpen ? 'collapsed' : ''}`}>
        <div className="fs-header">
          <h2 className="fs-title">Filtros</h2>
          <button className="fs-clear-btn">Limpiar</button>
        </div>

        <div className="fs-group">
          <span className="fs-group-label">Categoría</span>
          <select className="fs-select" defaultValue="">
            <option value="">Todas las categorías</option>
            <option value="camaras">Cámaras frigoríficas</option>
            <option value="exhibidoras">Exhibidoras comerciales</option>
          </select>
        </div>

        <div className="fs-group">
          <span className="fs-group-label">Marca</span>
          <select className="fs-select" defaultValue="">
            <option value="">Todas las marcas</option>
            <option value="bohn">Bohn</option>
            <option value="heatcraft">Heatcraft</option>
          </select>
        </div>

        <div className="fs-group">
          <span className="fs-group-label">Instalación</span>
          <div className="fs-radio-group">
            <label className="fs-radio-item">
              <input type="radio" name="instalacion" defaultChecked />
              Todos
            </label>
            <label className="fs-radio-item">
              <input type="radio" name="instalacion" />
              Requiere instalación
            </label>
            <label className="fs-radio-item">
              <input type="radio" name="instalacion" />
              Sin instalación requerida
            </label>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CatalogForm
