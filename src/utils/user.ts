import { ROUTER } from '@/constants/router'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  [key: string]: any
}

export const getUser = () => {
  return localStorage.getItem('token')
}

export const isExpiredToken = () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      return { token: null, isExpiredAccess: true }
    }

    const decoded: DecodedToken = jwtDecode(token)

    // Token muddati tugagan/tugamaganini tekshirish
    const isExpiredAccess = dayjs.unix(decoded.exp).diff(dayjs()) < 1

    if (isExpiredAccess) {
      localStorage.clear()
      window.location.href = ROUTER.AUTH
    }

    return { token, isExpiredAccess }
  } catch (error) {
    localStorage.clear()
    window.location.href = ROUTER.AUTH
    return { token: null, isExpiredAccess: true }
  }
}
