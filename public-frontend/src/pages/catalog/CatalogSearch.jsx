import { useRef } from 'react'
import Container from '../../shared_components/Container'
import useCatalogParams from '../../hooks/useCatalogParams'


const CatalogSearch = () => {
  const { currentParams, setCurrentParams } = useCatalogParams()
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentParams({ search: inputRef.current.value })
  }

  return (
    <div className="form-search-section">
      <Container>
        <div className="form-search-section-container">
          <h1>Catálogo de productos</h1>
          <p>Explorá nuestra selección de equipos de refrigeración. Precios disponibles post consulta.</p>
          <form className="form-search" onSubmit={handleSubmit}>
            <div className="search-input-wrap">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                defaultValue={currentParams?.search ?? ''}
                className="search-input"
                placeholder="Nombre o especificación técnica..."
                maxLength="120"
              />
            </div>
            <button type="submit" className="form-search-btn">Buscar</button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default CatalogSearch