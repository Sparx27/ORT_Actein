import { privateService } from '../../../config/privateServiceConfig'

export const getCategories = async (filters = {}) => {
  const { data } = await privateService.get('/categories', { params: filters })
  return data
}

export const getCategory = async (id) => {
  const { data } = await privateService.get(`/categories/${id}`)
  return data
}

export const postCategory = async (body) => {
  const { data } = await privateService.post('/categories', body)
  return data
}

export const toggleCategory = async ({ id, is_active }) => {
  const { data } = await privateService.patch(`/categories/${id}/status`, { is_active })
  return data
}

export const editCategory = async (id, body) => {
  console.log('body:')
  console.log(body)
  const { data } = await privateService.put(`/categories/${id}`, body)
  return data
}
