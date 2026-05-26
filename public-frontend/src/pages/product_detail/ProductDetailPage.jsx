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
import { buildCatalogPath } from '../../utils/productDataUtils'

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

  const catalogPath = buildCatalogPath(state ?? {})

  const categoryPath = (state?.category_id && String(state.category_id) === String(categoryId))
    ? buildCatalogPath({ page: state.page, category_id: categoryId })
    : buildCatalogPath({ page: 1, category_id: categoryId })

  return (
    <section className="product-detail">
      <Breadcrumb
        categoryLabel={categoryLabel}
        productLabel={productLabel}
        catalogPath={catalogPath}
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