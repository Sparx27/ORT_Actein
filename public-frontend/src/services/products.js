import { publicService } from '../config/publicServiceConfig'

export const getProducts = async () => {
  const { data } = await publicService.get('/products')
  return data
}

export const getProduct = async (id) => {
  const { data } = await publicService.get(`/products/${id}`)
  return data
}