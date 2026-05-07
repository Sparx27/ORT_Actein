import { Routes, Route, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CatalogPage from './pages/catalog/CatalogPage'
import LandingPage from './pages/landing/LandingPage'
import QuotePage from './pages/quote/QuotePage'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/productos')
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/productos" element={<CatalogPage />} />
        <Route path="/solicitud" element={<QuotePage />} />
      </Route>
    </Routes>
  )
}

export default App
