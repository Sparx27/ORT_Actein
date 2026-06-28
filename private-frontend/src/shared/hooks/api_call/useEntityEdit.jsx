import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEntityEdit = (mFn, qKey, qsKey) => {
  const queryClient = useQueryClient()

  const editMutation = useMutation({
    mutationFn: ({ id, body }) => mFn(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qKey] })   // lista: ['products']
      queryClient.invalidateQueries({ queryKey: [qsKey] })  // detalle: ['product']
    }
  })

  return { editMutation }
}

export default useEntityEdit