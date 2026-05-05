import { useState } from 'react'
import '../styles/header.css'
import logo from '../assets/header_icon.png'

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
            {/* CART BUTTON */}
            <button class="cart-btn" id="cartBtn" onclick="goToCart()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span class="cart-label">Lista de cotización</span>
              <div class="cart-count" id="cartCount">0</div>
            </button>

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
