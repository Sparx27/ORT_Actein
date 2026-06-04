import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ to, icon, children }) => {
  const { pathname } = useLocation()

  const isActive = to === '/'
    ? pathname === '/'
    : pathname.startsWith(to)

  return (
    <Link to={to} className={`nav-item${isActive ? ' active' : ''}`}>
      <span className="nav-icon">{icon}</span>
      {children}
    </Link>
  )
}

export default NavItem