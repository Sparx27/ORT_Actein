import { authService } from '../../../config/privateServiceConfig'

export const loginQuery = async (credentials) => {
  // credentials = { email, password }
  const { data } = await authService.post('/login', credentials)
  // data = { access_token, token_type }
  return data
}