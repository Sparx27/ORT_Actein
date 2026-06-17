import { useSearchParams } from 'react-router-dom'
import { API_FIELDS, FILTER_PARAMS, URL_PARAMS } from '../config/fieldsConfig'

const { URL_PAGE } = URL_PARAMS
const { API_PAGE } = API_FIELDS

const useCategoriesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get(URL_PAGE) ?? 1)

  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set(URL_PAGE, newPage)
      return prev
    })
  }

  const setCurrentParams = (newParams = {}) => {
    setSearchParams(prev => {
      prev.set(URL_PAGE, 1)
      Object.entries(FILTER_PARAMS).forEach(([apiField, urlParam]) => {
        const value = newParams[apiField]
        if (value) prev.set(urlParam, value)
        else prev.delete(urlParam)
      })
      return prev
    })
  }

  const currentParams = Object.fromEntries(
    Object.entries(FILTER_PARAMS)
      .map(([apiField, urlParam]) => [apiField, searchParams.get(urlParam)])
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
  )
  currentParams[API_PAGE] = page

  return { page, setPage, currentParams, setCurrentParams }
}

export default useCategoriesParams