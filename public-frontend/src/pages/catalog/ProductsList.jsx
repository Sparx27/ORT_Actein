import ProductCard from './ProductCard'
import useProducts from '../../hooks/useProducts'
import MessageBox from '../../shared_components/MessageBox'
import Pagination from './Pagination'
import { useState } from 'react'
import MessageText from '../../shared_components/MessageText'

const ProductsList = () => {
  const [page, setPage] = useState(1)
  const { productsQuery } = useProducts(page)

  if (productsQuery.isLoading) return <MessageText message={'Obteniendo productos...'} type={'info'} />
  if (productsQuery.error) return <MessageBox message={productsQuery.error.message} type="error" />

  const { products, total_pages } = productsQuery.data

  return (
    <div className="product-list">
      <div className="product-page-info">
        <Pagination
          currentPage={page}
          totalPages={total_pages}
          onPageChange={setPage}
        />
      </div>
      {productsQuery.isFetching && <MessageText message={'Actualizando...'} type={'info'} />}

      <div className="product-grid">
        {products.length === 0 ? (
          <MessageBox message={'No hay productos.'} type={'info'} />
        ) : (
          products.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={total_pages}
        onPageChange={setPage}
      />
    </div>
  )
}

export default ProductsList