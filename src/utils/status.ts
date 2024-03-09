/* eslint-disable quotes */
export const getStatus = (status: string) => {
  switch (status) {
    case 'success':
      return "Ro'yxatdan o'tdi"
    case 'in_progress':
      return 'Jarayonda'
    default:
      return 'Bekor qilindi'
  }
}
