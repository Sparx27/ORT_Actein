import ProductCard from './ProductCard'
import useProducts from '../../hooks/useProducts'

const ProductsList = () => {
  const { isLoading, isFetching, data, error } = useProducts()

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>
  if (data.products.length === 0) return <p>No hay productos.</p>

  return (
    <div className="product-grid">
      {isFetching && <p>Actualizando...</p>}
      {data.products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

export default ProductsList