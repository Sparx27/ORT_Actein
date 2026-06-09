import axios from 'axios'
export const VITE_URL_PRIVATE_SERVICE = import.meta.env.VITE_URL_PRIVATE_SERVICE

// AUTH
export const authService = axios.create({
  baseURL: VITE_URL_PRIVATE_SERVICE
})

authService.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail ?? 'Error de conexión, por favor intente nuevamente más tarde'
    return Promise.reject(new Error(message))
  }
)

// PRIVATE
export const privateService = axios.create({
  baseURL: VITE_URL_PRIVATE_SERVICE,
  headers: {} //AGREGAR HEADER AUTH JWT
})

privateService.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail ?? 'Error de conexión, por favor intente nuevamente más tarde'
    return Promise.reject(new Error(message))
  }
)