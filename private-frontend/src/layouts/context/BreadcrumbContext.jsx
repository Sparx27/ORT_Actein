import { createContext, useState, useMemo } from 'react'

const BreadcrumbContext = createContext(null)

export function BreadcrumbProvider({ children }) {
  const [overrides, setOverrides] = useState({})
  const value = useMemo(() => ({ overrides, setOverrides }), [overrides])

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export default BreadcrumbContext