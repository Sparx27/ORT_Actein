import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products'

const useProducts = () => {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 120, // 2hrs Porque no se espera que el catálogo esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 120, // 2hrs mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 2
  })

  return {
    productsQuery
  }
}

export default useProducts