import { BrowserRouter } from 'react-router-dom'

const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

export default Providers