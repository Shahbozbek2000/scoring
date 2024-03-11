import { request } from '@/configs/requests'

export const getAllApplications = async () => {
  return await request('/application/get/all')
}
