import { useParams } from 'react-router-dom'
import Container from '../../shared_components/Container'
import '../../styles/productDetail.css'
import ProductImage from './ProductImage'
import ProductActions from './ProductActions'
import ProductServices from './ProductServices'
import ProductInfo from './ProductInfo'
import ProductSpecs from './ProductSpecs'
import useProduct from '../../hooks/useProduct'

const ProductDetailPage = () => {
  const { id } = useParams()
  const productQuery = useProduct(id)

  if (productQuery.isLoading) return
  if (productQuery.error) return

  const { data } = productQuery
  console.log('page', productQuery)

  return (
    <section className="product-detail page-padding">
      <Container>
        {productQuery.isFetching && <p>Actualizando...</p>}
        <div className="product-detail-grid">
          <aside className="product-detail-left">
            <ProductImage src={null} productTitle={''} />
            <ProductActions />
            <ProductServices />
          </aside>

          <article className="product-article product-detail-right">
            <ProductInfo info={data} />
            <ProductSpecs />
          </article>
        </div>
      </Container>
    </section>
  )
}

export default ProductDetailPage