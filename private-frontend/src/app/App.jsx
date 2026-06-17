import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Providers from './Providers'
import AuthLayout from '../layouts/AuthLayout'
import LoginPage from '../features/auth/LoginPage'
import '../shared/styles/index.css'
import '../layouts/styles/layout.css'
import '../shared/styles/data_related.css'
import ProductCategoryPage from '../features/product_category/ProductCategoryPage'
import NotFound from './NotFound'
import ProductPage from '../features/product/ProductPage'
import TextPage from './TextPage'
import HomePage from '../features/Home/HomePage'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <Providers>
      <Routes>
        <Route path="/test" element={<TextPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/ingresar" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/categorias" element={<ProductCategoryPage />} />
            <Route path="/productos" element={<ProductPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Providers>
  )
}

export default App
