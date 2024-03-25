import { Button } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'

interface IColumn {
  number: number
  apply_number: string
  type_name: string
  date: string
  view_polis?: any
}

const columnHelper = createColumnHelper<IColumn>()

export const usePage = () => {
  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.row.index + 1,
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('apply_number', {
      header: () => <span>Ariza raqami</span>,
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
    columnHelper.accessor('view_polis', {
      header: () => <span>Polisni ko'rish</span>,
      cell: () => {
        return (
          <Button
            variant='outlined'
            sx={{
              color: '#60676D',
              borderRadius: '4px',
              border: '1px solid #E7E7E7',
              width: 115,
              height: 32,
            }}
          >
            Ko'rish
          </Button>
        )
      },
      footer: info => info.column.id,
    }),
  ]

  const data: IColumn[] = [
    {
      number: 1,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 2,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 3,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 4,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 5,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 6,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 7,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 8,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 9,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
    {
      number: 10,
      apply_number: '24022024',
      date: '24.02.2024',
      type_name: 'Xosil sug’urta',
    },
  ]

  return {
    data,
    columns,
  }
}
