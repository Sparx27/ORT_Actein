import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Página no encontrada</h1>
      <p className="notfound-text">
        La página que buscás no existe o fue movida.
      </p>
      <Link to="/" className="btn-base btn-primary notfound-btn">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound