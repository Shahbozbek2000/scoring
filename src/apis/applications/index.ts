import { request } from '@/configs/requests'

export const getAllApplications = async () => {
  return await request('/application/get/all')
}

export const getByIDApplications = async <T>(id: T) => {
  return await request(`/application/get/${id}`)
}

export const rejectApplications = async (payload: any) => {
  return await request.post(`/application/reject/${payload?.id}`, { comment: payload?.comment })
}

export const acceptApplications = async <T>(id: any, data: T) => {
  return await request.post(`/application/accept/${id}`, data)
}
