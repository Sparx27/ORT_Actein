import { useState } from 'react'
import '../../styles/header.css'
import logo from '../../assets/shared/header_icon.png'
import CartBtn from './CartBtn'

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="container header-container">

          <a className="logo-container">
            <img src={logo} />
            <h1>Refrigeración Industrial</h1>
          </a>

          <nav>
            <ul className="menu-container">
              <li><a href="#">Inicio</a></li>
              <li><a href="#" className="link-active">Catálogo</a></li>
              <li><a href="#">Solicitar Cotización</a></li>
            </ul>
          </nav>

          <div className="header-right">
            <CartBtn />

            {/* HAMBURGER MOVILE */}
            <button
              className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
              onClick={() => setMobileNavOpen(prev => !prev)}
              aria-label="Menú"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <a href="#">Inicio</a>
        <a href="#" className="active">Catálogo</a>
        <a href="#">Solicitar Cotización</a>
      </div>
    </>
  )
}

export default Header
