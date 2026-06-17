import axios from 'axios'
import { getToken, removeToken } from '../shared/auth/handleToken'
export const VITE_URL_PRIVATE_SERVICE = import.meta.env.VITE_URL_PRIVATE_SERVICE

// AUTH
export const authService = axios.create({
  baseURL: VITE_URL_PRIVATE_SERVICE
})

authService.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail ?? 'Error de conexión, intente nuevamente más tarde'
    return Promise.reject(new Error(message))
  }
)

// PRIVATE
export const privateService = axios.create({
  baseURL: VITE_URL_PRIVATE_SERVICE
})

privateService.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

privateService.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail ?? 'Error de conexión, intente nuevamente más tarde'
    if (error.status === 401) {
      removeToken()
      window.location.href = '/ingresar'
    }
    return Promise.reject(new Error(message))
  }
)