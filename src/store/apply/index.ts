import { create } from 'zustand'

interface ApplicationStoreProps {
  landTabs: number
  setLandTabs: (payload: number) => void
}

export const useApplicationStore = create<ApplicationStoreProps>(set => ({
  landTabs: 0,
  setLandTabs: (payload: number) => {
    set({ landTabs: payload })
  },
}))
