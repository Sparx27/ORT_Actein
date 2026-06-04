import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Providers from './Providers'
import AuthLayout from '../layouts/AuthLayout'
import LoginPage from '../features/auth/LoginPage'
import '../shared/styles/index.css'
import '../shared/styles/layout.css'

function App() {

  return (
    <Providers>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/ingresar" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<h1 className="h1">Index</h1>} />
        </Route>

      </Routes>
    </Providers>
  )
}

export default App
