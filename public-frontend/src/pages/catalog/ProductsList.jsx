import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../../services/products'

const ProductsList = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => setErrMessage(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="product-grid">
      {loading && <p>Cargando...</p>}
      {errMessage && <p style={{ color: 'red' }}>{errMessage}</p>}
      {!loading && !errMessage && products.length === 0 && <p>No hay productos.</p>}
      {!loading && !errMessage && products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

export default ProductsList