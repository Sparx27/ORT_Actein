import { useSearchParams } from 'react-router-dom'

const useProductsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('pagina') ?? 1)
  const search = searchParams.get('busqueda')

  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set('pagina', newPage)
      return prev
    })
  }

  const setCurrentParams = (newParams = {}) => {
    const { search } = newParams
    setSearchParams(prev => {
      prev.set('pagina', 1)
      prev.delete('busqueda')

      if (search) prev.set('busqueda', search)
      return prev
    })
  }

  // Esto es basicamente armar el objeto con todos los params actuales, y si por ejemplo no aplique search aun,
  // el objeto resultante no tiene key-value para esa entrada. Por eso el filter
  const currentParams = Object.fromEntries(
    Object.entries({ page, search })
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
  )

  return {
    page,
    setPage,
    currentParams,
    setCurrentParams
  }
}

export default useProductsParams