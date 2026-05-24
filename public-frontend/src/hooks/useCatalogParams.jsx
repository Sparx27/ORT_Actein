import { useSearchParams } from 'react-router-dom'

const useCatalogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const category = searchParams.get('categoria')

  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage)
      return prev
    })
  }

  const setCategory = (newCategory) => {
    setSearchParams(prev => {
      if (newCategory) prev.set('categoria', newCategory)
      else prev.delete('categoria')
      prev.set('page', 1)
      return prev
    })
  }

  return { page, category, setPage, setCategory }
}

export default useCatalogParams