import ProductCard from './ProductCard'
import useProducts from '../../hooks/useProducts'

const ProductsList = () => {
  const { productsQuery } = useProducts()

  if (productsQuery.isLoading) return <p>Cargando...</p>
  if (productsQuery.error) return <p style={{ color: 'red' }}>{productsQuery.error.message}</p>
  if (productsQuery.data.products.length === 0) return <p>No hay productos.</p>

  return (
    <div className="product-grid">
      {productsQuery.isFetching && <p>Actualizando...</p>}
      {productsQuery.data.products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

export default ProductsList