import { useQuery } from '@tanstack/react-query'

const useEntityGetById = (qFn, qKey, eId) => {
  const entityByIdQuery = useQuery({
    queryKey: [qKey, eId],
    queryFn: () => qFn(eId),
    enabled: !!eId,
    staleTime: 1000 * 60 * 120, // 2hrs Porque no se espera que el producto esté cambiando todo el tiempo
    gcTime: 1000 * 60 * 120, // 2hrs mismo razonamiento que el anterior aunque el componente se desmonte
    retry: 2
  })

  return { entityByIdQuery }
}

export default useEntityGetById