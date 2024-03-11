import { request } from '@/configs/requests'

export const login = async <T>(data: T) => {
  return await request.post('/auth/login', data)
}
