import { useParams } from 'react-router-dom'
import Container from '../../shared_components/Container'
import '../../styles/productDetail.css'
import useProduct from '../../hooks/useProduct'
import ProductDetail from './ProductDetail'
import ProductImage from './ProductImage'
import ProductActions from './ProductActions'
import ProductServices from './ProductServices'
import MessageBox from '../../shared_components/MessageBox'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { productQuery } = useProduct(id)

  if (productQuery.error) return (
    <section className="product-detail page-padding">
      <Container>
        <MessageBox message={productQuery.error.message} type="error" />
      </Container>
    </section>
  )

  const { data } = productQuery

  return (
    <section className="product-detail page-padding">
      <Container>
        <div className="product-detail-grid">
          <aside className="product-detail-left">
            <ProductImage src={null} productTitle={''} />
            <ProductActions disable={productQuery.isLoading} />
            {!productQuery.isLoading && productQuery.data.requires_instalation && <ProductServices />}
          </aside>

          {productQuery.isLoading ? (
            <p>Cargando...</p>
          ) : (
            <ProductDetail productData={data} />
          )}
        </div>
      </Container>
    </section>
  )
}

export default ProductDetailPage