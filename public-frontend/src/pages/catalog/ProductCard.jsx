import { Link } from 'react-router-dom'
import ContentBox from '../../shared_components/ContentBox'

const ProductCard = ({ product, currentParams }) => {
  const { id, name, category_name, brand } = product

  return (
    <div className="product-card-box">
      <article className="product-card">
        <div className="card-image">
          <img />
        </div>
        <div className="card-body">
          <div className="card-category">{category_name}</div>
          <div className="card-name">{name}</div>
          <div className="card-brand">{brand}</div>
          <div className="card-actions">
            <Link
              className="btn-detalle" to={`/productos/${id}`}
              state={currentParams}
            >
              Ver detalle
            </Link>
            <button className="btn-cotizar">
              + Cotizar
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductCard