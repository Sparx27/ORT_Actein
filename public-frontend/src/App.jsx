import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CatalogPage from './pages/catalog/CatalogPage'
import LandingPage from './pages/landing/LandingPage'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/productos" element={<CatalogPage />} />
      </Route>
    </Routes>
  )
}

export default App
