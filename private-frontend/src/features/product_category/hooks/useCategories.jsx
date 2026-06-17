import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/queryCategory'

const useCategories = (options) => {
  const categoriesQuery = useQuery({
    queryKey: ['categories', options],
    queryFn: () => getCategories(options),
    staleTime: 1000 * 60 * 120,
    gcTime: 1000 * 60 * 120,
    retry: 0,
    placeholderData: (previousData) => previousData
  })

  return { categoriesQuery }
}

export default useCategories