import { request } from '@/configs/requests'
import { type KMLData } from '@/types/poligon'

export const getData = async () => {
  return await request<KMLData>('response.json')
}
