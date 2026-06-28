import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEntityCreate = (mFn, qKey) => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: mFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qKey] })
    }
  })

  return { createMutation }
}

export default useEntityCreate