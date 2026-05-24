import { useContext, useEffect } from 'react'
import BreadcrumbContext from '../layouts/breadcrumb/BreadcrumbContext'

// items: array de { label, path? }
const useBreadcrumbItems = (items) => {
  const { setItems } = useContext(BreadcrumbContext)

  useEffect(() => {
    setItems(items)
    // Al desmontar la página se limpia evitando items
    return () => setItems([])
  }, [JSON.stringify(items)]) // El stringify evita problemas de comparar Arrays... que son distintos en memoria
}

export default useBreadcrumbItems