import { ROUTER } from '@/constants/router'
import type { ErrorProps } from '@/types/error'
import { getUser, isExpiredToken } from '@/utils/user'
import axios, { type AxiosHeaders } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://agro.semurgins.uz/api/'

export const request = axios.create({
  baseURL,
})

request.interceptors.request.use(
  async config => {
    const user = getUser()
    if (user) {
      const { isExpiredAccess } = isExpiredToken()

      if (isExpiredAccess) {
        localStorage.clear()
        window.location.href = ROUTER.AUTH
        return config
      }

      ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${user}`)
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
