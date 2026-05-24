import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../services/products'

const useProduct = (id) => {
  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 120,
    gcTime: 1000 * 60 * 120,
    retry: 2
  })

  return {
    productQuery
  }
}

export default useProduct