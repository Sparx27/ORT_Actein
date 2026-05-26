import ProductCard from './ProductCard'
import useProducts from '../../hooks/useProducts'
import MessageBox from '../../shared_components/MessageBox'
import Pagination from './Pagination'
import MessageText from '../../shared_components/MessageText'
import useCatalogParams from '../../hooks/useCatalogParams'

const ProductsList = () => {
  const { page, currentParams, setPage } = useCatalogParams()
  const { productsQuery } = useProducts({ page, ...currentParams })

  if (productsQuery.isLoading) return <MessageText message={'Obteniendo productos...'} type={'info'} />
  if (productsQuery.error) return <MessageBox message={productsQuery.error.message} type="error" />

  const { products, total_pages } = productsQuery.data

  return (
    <div className="product-list">
      <div className="product-page-controls">
        <Pagination
          currentPage={page}
          totalPages={total_pages}
          onPageChange={setPage}
        />
      </div>

      <div className="product-list-message">
        {productsQuery.isFetching && <MessageText message={'Actualizando...'} type={'info'} />}
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <MessageBox message={'No hay productos.'} type={'info'} />
        ) : (
          products.map(p => <ProductCard
            key={p.id}
            product={p}
            currentParams={currentParams}
          />)
        )}
      </div>

      <div className="product-page-controls">
        <Pagination
          currentPage={page}
          totalPages={total_pages}
          onPageChange={setPage}
        />
      </div>
    </div >
  )
}

export default ProductsList