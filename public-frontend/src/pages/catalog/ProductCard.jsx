import { Link } from 'react-router-dom'
import ContentBox from '../../shared_components/ContentBox'


const ProductCard = ({ product }) => {
  const { id, nombre, categoria_nombre, marca } = product

  return (
    <ContentBox>
      <Link to="/productos/1">
        <article className="product-card">
          <div className="card-image">
            <img />
          </div>
          <div className="card-body">
            <div className="card-category">{categoria_nombre}</div>
            <div className="card-name">{nombre}</div>
            <div className="card-brand">{marca}</div>
            <div className="card-no-price">Precio disponible previa consulta</div>
            <div className="card-actions">
              <button className="btn-detalle">Ver detalle</button>
              <button className="btn-cotizar">
                + Cotizar
              </button>
            </div>
          </div>
        </article>
      </Link>
    </ContentBox>
  )
}

export default ProductCard