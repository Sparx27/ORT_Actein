import axios from 'axios'
export const VITE_URL_PUBLIC_SERVICE = import.meta.env.VITE_URL_PUBLIC_SERVICE

export const publicService = axios.create({
  baseURL: VITE_URL_PUBLIC_SERVICE
  /*
  headers: {} podria agregar tokens etc si fuera necesario
  */
})

publicService.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail ?? 'Error de conexión, por favor intente nuevamente más tarde'
    return Promise.reject(new Error(message))
  }
)