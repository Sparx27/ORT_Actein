import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/queryProduct'

const useProducts = (options) => {
  const { page, search } = options

  const productsQuery = useQuery({
    queryKey: ['products', { page, search }],
    queryFn: () => getProducts({ page, search }),
    staleTime: 1000 * 60 * 120, // 2hrs Porque no se espera que el catálogo esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 120, // 2hrs mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 0,
    // Mientras carga la página siguiente mantiene visible la actual en vez de mostrar el loading state
    placeholderData: (previousData) => previousData
  })

  return { productsQuery }
}

export default useProducts