import { useQuery } from '@tanstack/react-query'
import { getProductCats } from '../services/queryProduct'

const useProductsCats = () => {
  const productCats = useQuery({
    queryKey: ['productCats'],
    queryFn: getProductCats,
    staleTime: 1000 * 60 * 120,
    gcTime: 1000 * 60 * 120,
    retry: 0,
    placeholderData: (previousData) => previousData
  })

  return { productCats }
}

export default useProductsCats