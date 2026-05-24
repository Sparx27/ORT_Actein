import { getPageList } from '../../utils/paginationUtils'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const items = getPageList(currentPage, totalPages)

  return (
    <nav className="pagination">

      {/* Botón Anterior */}
      <button
        className="pagination-nav"
        onClick={() => onPageChange(p => p - 1)}
        disabled={currentPage === 1}
      >
        <span className="pagination-nav-arrow">‹</span> Anterior
      </button>

      {/* Números y puntos suspensivos */}
      {items.map((item, i) =>
        item === '...'
          ? <span key={`dots-${i}`} className="pagination-dots">...</span>
          // Cada número es un botón. Si es la página actual, tiene clase 'active'
          : <button
            key={item}
            className={`pagination-page ${item === currentPage ? 'pagination-page--active' : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
      )}

      {/* Botón Siguiente */}
      <button
        className="pagination-nav"
        onClick={() => onPageChange(p => p + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente <span className="pagination-nav-arrow">›</span>
      </button>

    </nav>
  )
}
export default Pagination