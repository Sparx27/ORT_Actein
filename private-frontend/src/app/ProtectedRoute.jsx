import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../shared/auth/useAuth'

const ProtectedRoute = () => {
  const { isAuth } = useAuth()

  if (!isAuth) return <Navigate to="/ingresar" replace />

  return <Outlet />
}

export default ProtectedRoute