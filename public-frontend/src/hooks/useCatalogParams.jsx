import { useSearchParams } from 'react-router-dom'

const useCatalogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('pagina') ?? 1)
  const search = searchParams.get('busqueda')
  const category_id = searchParams.get('categoria')
  const brand = searchParams.get('marca')
  const installation = searchParams.get('instalacion')

  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set('pagina', newPage)
      return prev
    })
  }

  const setCurrentParams = (newParams = {}) => {
    const { search, category_id, brand, installation } = newParams
    setSearchParams(prev => {
      prev.delete('busqueda')
      prev.delete('categoria')
      prev.delete('marca')
      prev.delete('instalacion')

      if (search) prev.set('busqueda', search)
      if (category_id) prev.set('categoria', category_id)
      if (brand) prev.set('marca', brand)
      if (installation) prev.set('marca', installation)

      prev.set('pagina', 1)
      return prev
    })
  }

  // Esto es basicamente armar el objeto con todos los params actuales, y si por ejemplo no aplique search aun,
  // el objeto resultante no tiene key-value para esa entrada. Por eso el filter
  const currentParams = Object.fromEntries(
    Object.entries({ page, search, category_id, brand, installation })
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
  )

  return {
    page,
    setPage,
    currentParams,
    setCurrentParams
  }
}

export default useCatalogParams