import { type ErrorProps } from '@/types/error'
import axios from 'axios'
const baseURL = '/static/'
export const request = axios.create({
  baseURL,
})

request.interceptors.request.use(
  async config => {
    return config
  },
  async error => {
    return await Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    return response
  },
  async (error: ErrorProps) => {
    return await Promise.reject(error)
  },
)
