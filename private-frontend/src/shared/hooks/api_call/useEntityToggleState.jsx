import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const useEntityToggleState = (qFn, qKey) => {
  const queryClient = useQueryClient()

  const toggleStateMutation = useMutation({
    mutationFn: qFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qKey] })
    }
  })

  return { toggleStateMutation }
}

export default useEntityToggleState