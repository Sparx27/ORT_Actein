import { useQuery } from '@tanstack/react-query'

const useGetEntities = (qKey, qFn, options) => {
  const entitiesQuery = useQuery({
    queryKey: [qKey, options],
    queryFn: () => qFn(options),
    staleTime: 1000 * 60 * 120, // 2hrs Porque no se espera que el catálogo esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 120, // 2hrs mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 2,
    // Mientras carga la página siguiente mantiene visible la actual en vez de mostrar el loading state
    placeholderData: (previousData) => previousData
  })

  return { entitiesQuery }
}

export default useGetEntities