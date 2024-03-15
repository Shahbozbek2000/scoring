import { type TableOptions } from '@tanstack/react-table'

export interface TableProps<T extends object> {
  isLoading?: boolean
  isFetching?: boolean
  emptyTitle?: string
  isExpanded?: boolean
  onRowClick?: (row: T) => void
  options: Omit<TableOptions<T>, 'getCoreRowModel' | 'getPaginationRowModel'>
}
