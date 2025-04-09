import { COLORS } from '@/constants/css'

/* eslint-disable quotes */
export const getStatus = (status: number) => {
  switch (status) {
    case 1:
      return 'Jarayonda'
    case 2:
      return "Ro'yxatdan o'tdi"
    default:
      return 'Bekor qilingan'
  }
}

export const getStatus2 = (status: boolean | null) => {
  switch (status) {
    case null:
      return { color: '#dc3545', text: 'Imzolanmagan' }
    case true:
      return { color: '#08705F', text: 'Imzolandi' }
    default:
      return { color: '#dc3545', text: 'Rad etildi' }
  }
}
