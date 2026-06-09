import { privateService } from '../../../config/privateServiceConfig'

export const getProducts = async ({ page, search }) => {

  const params = {
    ...(page && { page }),
    ...(search && { search })
  }

  const { data } = await privateService.get('/products', { params })
  return data
}

export const getProduct = async (id) => {
  const { data } = await privateService.get(`/products/${id}`)
  return data
}