import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products'

/*
  NOTA: Podria hacer
    const { productQuery } = useQuery({
      queryKey: ['products'],
      queryFn: getProducts,
      // staleTime: 1000 * 60 (1 hr)
      retry: 2
    })

  Y devolver ese query en particular para asi tener varios queries aca en este hook
*/

const useProducts = () => {
  const {
    isLoading,
    isFetching,
    data,
    error,
    refetch
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60, // 1hr Porque no se espera que el catálogo esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 60, // 1hr mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 2
  })

  /*
    ej. con refetch en btn onclick () => refect()
  */

  return {
    isLoading,
    isFetching,
    data,
    error,
    refetch
  }
}

export default useProducts