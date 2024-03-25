import { Badge } from '@/styles/global'
import { Button } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { type ReactNode } from 'react'

interface IColumns {
  number: number
  status_name: string
  status_code: boolean | null
  apply_number: string
  login: string
  date: string
  check_status?: ReactNode
}

const columnHelper = createColumnHelper<IColumns>()

export const usePage = () => {
  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.row.index + 1,
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('status_name', {
      id: 'status_name',
      cell: ({ row }) => {
        return (
          <Badge
            className={`${row.original.status_code === null ? 'in_progress' : row.original?.status_code ? 'success' : 'canceled'}`}
          >
            {row.original?.status_name}
          </Badge>
        )
      },
      header: () => <span>Status</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('apply_number', {
      id: 'apply_number',
      header: () => <span>Ariza raqami</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('login', {
      id: 'login',
      header: () => <span>login</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: () => <span>Ariza sanasi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('check_status', {
      header: () => <span>Statusni belgilash</span>,
      footer: info => info.column.id,
      cell: () => (
        <Button
          variant='outlined'
          sx={{
            width: 108,
            height: 36,
            color: 'var(--Green)',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Belgilash
        </Button>
      ),
    }),
  ]

  const data: IColumns[] = [
    {
      number: 1,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 2,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 3,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 4,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 5,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 6,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
    {
      number: 7,
      status_name: 'Kelib tushgan',
      status_code: false,
      apply_number: '24022024',
      login: 'Proweb',
      date: '24.02.2024',
    },
  ]

  return { data, columns }
}
