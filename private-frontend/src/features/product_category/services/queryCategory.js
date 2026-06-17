import { privateService } from '../../../config/privateServiceConfig'

export const getCategories = async (filters = {}) => {
  const { data } = await privateService.get('/categories', { params: filters })
  return data
}

export const getCategory = async (id) => {
  const { data } = await privateService.get(`/categories/${id}`)
  return data
}