import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postProduct } from '../services/queryProduct'

const useCreateProduct = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  return { createMutation }
}

export default useCreateProduct