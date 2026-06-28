import { useSearchParams } from 'react-router-dom'

const useEntityParams = (url_page_param, api_page_param, api_url_mapped_params) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get(url_page_param) ?? 1)

  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set(url_page_param, newPage)
      return prev
    })
  }

  const setCurrentParams = (newParams = {}) => {
    setSearchParams(prev => {
      prev.set(url_page_param, 1)
      Object.entries(api_url_mapped_params).forEach(([apiField, urlParam]) => {
        const value = newParams[apiField]
        if (value) prev.set(urlParam, value)
        else prev.delete(urlParam)
      })
      return prev
    })
  }

  // Lee cada filtro desde la URL -> al recargar la página los filtros se reconstruyen
  const currentParams = Object.fromEntries(
    Object.entries(api_url_mapped_params)
      .map(([apiField, urlParam]) => [apiField, searchParams.get(urlParam)])
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
  )
  currentParams[api_page_param] = page

  return {
    page,
    setPage,
    currentParams,
    setCurrentParams
  }
}

export default useEntityParams