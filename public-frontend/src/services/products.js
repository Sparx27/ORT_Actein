import { VITE_URL_PUBLIC_SERVICE } from '../config/apiConfig'

export const getProducts = async () => {
  const res = await fetch(`${VITE_URL_PUBLIC_SERVICE}/productos`)

  if (!res.ok) {
    const { detail } = await res.json()
    throw new Error(`Error ${res.status}: ${detail}`)
  }

  return res.json()
}