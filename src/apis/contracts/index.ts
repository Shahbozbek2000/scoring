import { request } from '@/configs/requests'

export const getAllContracts = async () => {
  return await request('/contract/get/all')
}
export const acceptContract = async <T>(id: T) => {
  return await request(`/contract/accept/${id}`)
}

export const contractGenerateDoc = async <T>(id: T) => {
  return await request(`/contract/generate-doc/${id}`)
}

export const contractDetail = async <T>(id: T) => {
  return await request(`/contract/get/${id}`)
}
