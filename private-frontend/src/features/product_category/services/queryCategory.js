import { privateService } from '../../../config/privateServiceConfig'

export const getCategories = async ({ page, search }) => {

  const params = {
    ...(page && { page }),
    ...(search && { search })
  }

  const { data } = await privateService.get('/categories', { params })
  return data
}

export const getCategory = async (id) => {
  const { data } = await privateService.get(`/categories/${id}`)
  return data
}