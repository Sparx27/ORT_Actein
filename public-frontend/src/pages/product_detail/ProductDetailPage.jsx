import { useLocation, useParams } from 'react-router-dom'
import Container from '../../shared_components/Container'
import '../../styles/productDetail.css'
import useProduct from '../../hooks/useProduct'
import ProductDetail from './ProductDetail'
import ProductImage from './ProductImage'
import ProductActions from './ProductActions'
import ProductServices from './ProductServices'
import MessageBox from '../../shared_components/MessageBox'
import Breadcrumb from '../../shared_components/breadcrumb/Breadcrumb'
import MessageText from '../../shared_components/MessageText'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { productQuery } = useProduct(id)
  const { state } = useLocation()

  if (productQuery.error) return (
    <section className="product-detail page-padding">
      <Container>
        <MessageBox message={productQuery.error.message} type="error" />
      </Container>
    </section>
  )

  const { data } = productQuery

  const categoryLabel = productQuery.data?.category_name ?? 'Categoría'
  const productLabel = productQuery.data?.name ?? `Producto #${id}`
  const categoryId = productQuery.data?.category_id

  const backPath = state?.fromPage
    ? `/productos?page=${state.fromPage}${state.fromCategory ? `&categoria=${state.fromCategory}` : ''}`
    : '/productos'

  const categoryPath = state?.fromCategory
    ? `/productos?page=${state.fromPage}&categoria=${state.fromCategory}`
    : categoryId
      ? `/productos?page=1&categoria=${categoryId}`
      : '/productos?page=1'

  return (
    <section className="product-detail">
      <Breadcrumb
        categoryLabel={categoryLabel}
        productLabel={productLabel}
        backPath={backPath}
        categoryPath={categoryPath} />
      <div className="page-padding">
        <Container>
          <div className="product-detail-grid">
            <aside className="product-detail-left">
              <ProductImage src={null} productTitle={''} />
              <ProductActions disable={productQuery.isLoading} />
              {!productQuery.isLoading && productQuery.data.requires_installation && <ProductServices />}
            </aside>

            {productQuery.isLoading ? (
              <MessageText message={'Cargando...'} type={'info'} />
            ) : (
              <ProductDetail productData={data} />
            )}
          </div>
        </Container>
      </div>
    </section>
  )
}

export default ProductDetailPage