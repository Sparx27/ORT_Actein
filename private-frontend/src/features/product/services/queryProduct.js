import { privateService } from '../../../config/privateServiceConfig'

export const getProducts = async (filters = {}) => {
  const { data } = await privateService.get('/products', { params: filters })
  return data
}

export const getProductCats = async () => {
  const { data } = await privateService.get('/categories/options')
  return data
}

export const getProduct = async (id) => {
  const { data } = await privateService.get(`/products/${id}`)
  return data
}

export const postProduct = async (body) => {
  const { data } = await privateService.post('/products', body)
  return data
}

export const editProduct = async (id, body) => {
  console.log('body:')
  console.log(body)
  const { data } = await privateService.put(`/products/${id}`, body)
  return data
}

export const toggleProduct = async ({ id, is_active }) => {
  const { data } = await privateService.patch(`/products/${id}/status`, { is_active })
  return data
}