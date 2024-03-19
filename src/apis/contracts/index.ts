import { request } from '@/configs/requests'

export const getAllContracts = async () => {
  return await request('/contract/get/all')
}
