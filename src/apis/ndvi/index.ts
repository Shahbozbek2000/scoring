import { request } from '@/configs/requests'

export const getNdviWithContour = async (id: string | undefined) => {
  return await request(`ndvi/contour/${id}`)
}
