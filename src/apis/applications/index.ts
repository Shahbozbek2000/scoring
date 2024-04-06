import { request } from '@/configs/requests'

interface IParams {
  page: number
  limit: number
}

export const getAllApplications = async (params: IParams) => {
  return await request('/application/get/all', {
    params: {
      page: params.page,
      limit: params.limit,
    },
  })
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
