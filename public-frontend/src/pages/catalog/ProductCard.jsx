import { Link } from 'react-router-dom'
import ContentBox from '../../shared_components/ContentBox'


const ProductCard = ({ product }) => {
  const { id, name, category_name, brand } = product

  return (
    <ContentBox>
      <article className="product-card">
        <div className="card-image">
          <img />
        </div>
        <div className="card-body">
          <div className="card-category">{category_name}</div>
          <div className="card-name">{name}</div>
          <div className="card-brand">{brand}</div>
          <div className="card-no-price">Precio disponible previa consulta</div>
          <div className="card-actions">
            <button className="btn-detalle"><Link to={`/productos/${id}`}>Ver detalle</Link></button>
            <button className="btn-cotizar">
              + Cotizar
            </button>
          </div>
        </div>
      </article>
    </ContentBox>
  )
}

export default ProductCard