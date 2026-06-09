import BrandLogo from '../../../shared/components/BrandLogo'

const LoginContentLeft = () => {
  return (
    <article className="login-left-container">

      <div>
        <BrandLogo />

        <div className="brand-message">
          <h2 className="h2">Gestión de cotizaciones y procesos de venta en un solo lugar.</h2>
          <p>Panel de administración interno. Acceso restringido a personal autorizado.</p>
        </div>

        <div className="brand-footer">© 2026 Actein</div>
      </div>

    </article>
  )
}

export default LoginContentLeft