import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products'

const useProducts = (page) => {
  const productsQuery = useQuery({
    queryKey: ['products', { page }],
    queryFn: () => getProducts({ page }),
    staleTime: 1000 * 60 * 120, // 2hrs Porque no se espera que el catálogo esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 120, // 2hrs mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 2,
    // Mientras carga la página siguiente mantiene visible la actual en vez de mostrar el loading state
    placeholderData: (previousData) => previousData,
  })

  return { productsQuery }
}

export default useProducts