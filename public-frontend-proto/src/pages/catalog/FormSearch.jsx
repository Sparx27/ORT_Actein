import { useState } from 'react'

const FormSearch = () => {
  const [search, setSearch] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    console.log(search)
  }

  const handleInputChange = (e) => {
    setSearch(e.value)
  }

  return (
    <section className="form-search-section">
      <div className="container form-search-section-container">
        <h1>Catálogo de productos</h1>
        <p>Explorá nuestra selección de equipos de refrigeración. Precios disponibles post consulta.</p>
        <form className="form-search" onSubmit={handleSubmit}>
          <div className="search-input-wrap">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              id="searchInput"
              placeholder="Nombre o especificación técnica..."
              maxLength="120"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-buscar">Buscar</button>
        </form>
      </div>
    </section>
  )
}

export default FormSearch

