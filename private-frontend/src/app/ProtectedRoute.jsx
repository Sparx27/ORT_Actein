import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  // Aca ya de paso estaria bueno una peticion para verificar jwt si sigue valido o whatever
  const token = localStorage.getItem('jwt')

  // Por ahora que finja demencia, luego agrego correctamente la funcionalidad
  if (token) return <Navigate to={'/ingresar'} replace />

  return <Outlet />
}

export default ProtectedRoute