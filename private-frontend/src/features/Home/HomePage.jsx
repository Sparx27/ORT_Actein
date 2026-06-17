import { Link } from 'react-router-dom'
import './home.css'
import MainContentDisplay from '../../layouts/components/MainContentDisplay'

const IconBox = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const IconTag = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const IconFlow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const IconBuilding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" />
    <line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" />
    <line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" />
    <path d="M9 22v-4h6v4" />
  </svg>
)

// Datos de ejemplo — reemplazá por tus queries de TanStack Query
const STATS = [
  { label: 'Productos', value: 124, to: '/productos', icon: <IconBox /> },
  { label: 'Categorías', value: 8, to: '/categorias', icon: <IconTag /> },
  { label: 'Procesos activos', value: 17, to: '/procesos', icon: <IconFlow /> },
  { label: 'Empresas', value: 43, to: '/empresas', icon: <IconBuilding /> },
]

const RECENT = [
  { text: 'Nuevo proceso de venta creado', meta: 'Cámaras frigoríficas · hace 2 h' },
  { text: 'Categoría "Compresores" editada', meta: 'hace 5 h' },
  { text: 'Producto agregado al catálogo', meta: 'Evaporadora X-200 · ayer' },
  { text: 'Empresa registrada', meta: 'FríoTotal S.A. · ayer' },
]

const HomePage = () => {
  return (
    <MainContentDisplay>
      <div className="home">
        <header className="home-header">
          <h1 className="home-title">Inicio</h1>
          <p className="home-sub">Resumen general del sistema</p>
        </header>

        {/* ── Cards de métricas ── */}
        <div className="stat-grid">
          {STATS.map(s => (
            <Link key={s.label} to={s.to} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Actividad reciente ── */}
        <section className="home-panel">
          <h2 className="home-panel-title">Actividad reciente</h2>
          <ul className="activity-list">
            {RECENT.map((r, i) => (
              <li key={i} className="activity-item">
                <span className="activity-dot" />
                <div className="activity-body">
                  <span className="activity-text">{r.text}</span>
                  <span className="activity-meta">{r.meta}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MainContentDisplay>
  )
}

export default HomePage