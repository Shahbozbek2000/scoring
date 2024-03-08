import { type HocProps } from '@/types/hoc'
import { Suspense } from '@/components/suspense'

export const Hoc = ({ children }: HocProps) => {
  return <Suspense>{children}</Suspense>
}
