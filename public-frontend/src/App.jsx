import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CatalogPage from './pages/catalog/CatalogPage'
import LandingPage from './pages/landing/LandingPage'
import QuotePage from './pages/quote/QuotePage'
import ProductDetailPage from './pages/product_detail/ProductDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/productos" element={<CatalogPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/solicitud" element={<QuotePage />} />
      </Route>
    </Routes>
  )
}

export default App
