import { type ErrorProps } from '@/types/error'
import axios, { type AxiosHeaders } from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
export const request = axios.create({
  baseURL,
})

request.interceptors.request.use(
  async config => {
    if (token) {
      ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
      return config
    }
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
