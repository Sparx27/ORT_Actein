import { createContext, useState, useMemo, useCallback } from 'react'
import { getToken, removeToken, setToken } from './handleToken'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())

  const login = useCallback((newToken) => {
    setToken(newToken)
    setTokenState(newToken)
  }, [])

  const logout = useCallback(() => {
    removeToken()
    setTokenState(null)
  }, [])

  // isAuth: booleano derivado. !!token convierte el string (o null) a true/false.
  const value = useMemo(() => ({
    token,
    isAuth: !!token,
    login,
    logout,
  }), [token])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext