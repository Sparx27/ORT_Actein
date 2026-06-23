import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postCategory } from '../services/queryCategory'


const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  return { createMutation }
}

export default useCreateCategory