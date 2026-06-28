import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

const useEntityFilter = (api_url_mapped_params) => {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(api_url_mapped_params).map(
        ([apiField, urlParam]) => [apiField, searchParams.get(urlParam) ?? '']
      )
    )
  })

  const reset = () => {
    Object.keys(api_url_mapped_params).forEach(field => setValue(field, ''))
  }

  return { register, handleSubmit, control, reset }
}

export default useEntityFilter