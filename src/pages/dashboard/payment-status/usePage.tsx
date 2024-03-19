/* eslint-disable quotes */
import { Badge } from '@/styles/global'
import { Button } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'

interface IColumns {
  number: number
  apply_number: string
  status_name: string
  status_code: boolean | null
  farmer_name: string
  type_name: string
  date: string
  check_status?: string
  price: number
}

const columnHelper = createColumnHelper<IColumns>()

export const usePage = () => {
  const [open, setOpen] = useState(false)

  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.row.index + 1,
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('status_name', {
      id: 'status_name',
      cell: ({ row }: any) => {
        return (
          <Badge
            className={`${row.original.status_code === null ? 'in_progress' : row.original?.status_code === true ? 'success' : 'canceled'}`}
          >
            {row.original?.status_name}
          </Badge>
        )
      },
      header: () => <span>Statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('apply_number', {
      header: () => 'Ariza raqami',
      cell: ({ row }) => {
        return <p>{row.original.farmer_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('farmer_name', {
      header: () => 'Korxona nomi',
      cell: ({ row }) => {
        return <p>{row.original.farmer_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: () => <span>Sana</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('type_name', {
      header: () => <span>Sug’urta turi</span>,
      cell: ({ row }) => {
        return <p>{row.original.type_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('price', {
      header: () => <span>Summa</span>,
      cell: ({ row }) => {
        return <p>{row.original.type_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('check_status', {
      header: () => <span>Statusni belgilash</span>,
      footer: info => info.column.id,
      cell: () => (
        <Button
          variant='outlined'
          sx={{
            color: '#60676D',
            borderRadius: '4px',
            border: '1px solid #E7E7E7',
            width: 115,
            height: 32,
          }}
          onClick={() => {
            setOpen(true)
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
      apply_number: '24022024',
      status_name: "Ro'yxatdan o'tdi",
      status_code: true,
      farmer_name: 'MCHJ',
      type_name: 'Xosil sug’urta',
      date: '24.02.2024',
      price: 256000,
    },
    {
      number: 2,
      apply_number: '24022024',
      status_name: 'Bekor qilingan',
      status_code: false,
      farmer_name: 'MCHJ',
      type_name: 'Xosil sug’urta',
      date: '24.02.2024',
      price: 256000,
    },
  ]

  return {
    open,
    data,
    columns,
    setOpen,
  }
}
