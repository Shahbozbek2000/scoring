import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IModal {
  title?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}
