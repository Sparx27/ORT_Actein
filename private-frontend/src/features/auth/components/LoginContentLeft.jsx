import SvgPC from '../../../shared/components/svgs/SvgPC'

const LoginContentLeft = () => {
  return (
    <div className="login-left-container">

      <div className="brand-container">
        <div className="brand-icon">
          <SvgPC />
        </div>
        <div>
          <div className="brand-name">Sistema Interno</div>
          <div className="brand-sub">Gestión comercial</div>
        </div>
      </div>

      <div class="brand-message">
        <h2>Gestión de cotizaciones y procesos de venta en un solo lugar.</h2>
        <p>Panel de administración interno. Acceso restringido a personal autorizado.</p>
      </div>

      <div class="brand-footer">© 2026 Actein — Uso interno</div>

    </div>
  )
}

export default LoginContentLeft