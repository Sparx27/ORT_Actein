import { publicService } from '../config/publicServiceConfig'

export const getProducts = async ({ page }) => {

  const params = {
    // Bizarreadas hermosas que te solo JS te permite hacer
    ...(page && { page })
  }

  const { data } = await publicService.get('/products', { params })
  return data
}

export const getProduct = async (id) => {
  const { data } = await publicService.get(`/products/${id}`)
  return data
}