import { Link, useLocation } from 'react-router-dom'

const BottomTab = ({ to, icon, label }) => {
  const { pathname } = useLocation()
  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <Link to={to} className={`bottom-tab${isActive ? ' active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

const BottomNav = ({ tabs, onMore }) => {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {tabs.map(tab => (
          <BottomTab key={tab.to} to={tab.to} icon={tab.icon} label={tab.label} />
        ))}

        <button className="bottom-tab" onClick={onMore} aria-label="Más opciones">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span>Más</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNav