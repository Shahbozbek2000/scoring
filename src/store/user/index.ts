import { create } from '@/configs/zustand'
import { type MyFormValues } from '@/types/user'

interface UserStoreProps {
  users: MyFormValues[]
  setUser: (user: MyFormValues) => void
  deleteUser: (userId: string) => void
  updateUser: (updatedUser: MyFormValues) => void
}

export const useUserStore = create<UserStoreProps>(set => ({
  users: [],
  setUser: user => {
    set(state => ({ users: [...state.users, user] }))
  },
  deleteUser: userId => {
    set(state => ({
      users: state.users.filter(user => user.id !== userId),
    }))
  },
  updateUser: updatedUser => {
    set(state => ({
      users: state.users.map(user => (user.id === updatedUser?.id ? updatedUser : user)),
    }))
  },
}))
