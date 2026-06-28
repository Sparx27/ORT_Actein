import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const useEntityForm = ({ values, isSuccess, onSubmit }) => {
  const { register, handleSubmit, formState, control, reset } = useForm(
    values ? { values } : undefined
  )
  const { errors } = formState

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  const submitHandler = handleSubmit(onSubmit)

  return { register, control, errors, reset, submitHandler }
}

export default useEntityForm