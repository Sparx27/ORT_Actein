import { createContext, useState } from 'react'

const BreadcrumbContext = createContext()

export const BreadcrumbProvider = ({ children }) => {
  const [items, setItems] = useState([])

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export default BreadcrumbContext