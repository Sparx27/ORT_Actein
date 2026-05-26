import { publicService } from '../config/publicServiceConfig'

export const getProducts = async ({ page, category_id, brand, requires_installation, search }) => {

  const params = {
    // Bizarreadas hermosas que te solo JS te permite hacer
    ...(page && { page }),
    ...(search && { search }),
    ...(category_id && { category_id }),
    ...(brand && { brand }),
    ...(requires_installation && { requires_installation })
  }

  const { data } = await publicService.get('/products', { params })
  return data
}

export const getProduct = async (id) => {
  const { data } = await publicService.get(`/products/${id}`)
  return data
}