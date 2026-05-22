import { publicService } from '../config/publicServiceConfig'

export const getProducts = async () => {
  const { data } = await publicService.get('/products')
  return data
}