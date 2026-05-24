import { Link } from 'react-router-dom'

// items = array de { label, path }
const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb-bar">
      <nav className="breadcrumb-inner">

        <Link to={items[items.length - 2]?.path ?? '/'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: 'var(--gray-400)' }}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        {items.map((item, i) => {
          const isLast = i === items.length - 1

          return (
            <span key={i} className="breadcrumb-item">
              {/* Separador — no va antes del primer item */}
              {i > 0 && <span className="bc-sep">›</span>}

              {isLast
                // Último item: texto plano, no clickeable
                ? <span className="bc-current">{item.label}</span>
                // Items anteriores: links navegables
                : <Link to={item.path}>{item.label}</Link>
              }
            </span>
          )
        })}

      </nav>
    </div>
  )
}

export default Breadcrumb