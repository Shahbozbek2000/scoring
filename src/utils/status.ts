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
