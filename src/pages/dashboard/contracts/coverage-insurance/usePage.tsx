/* eslint-disable quotes */
import { DATE_FORMAT } from '@/constants/format'
import { Badge } from '@/styles/global'
import { Button, Stack } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'

interface IColumns {
  number: string | number
  name: string
  farmer_name?: string
  region?: string
  district?: string
  type?: string
  date?: string
  check_status?: string
}

const columnHelper = createColumnHelper<IColumns>()

export const usePage = () => {
  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.row.index + 1,
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
      id: 'apply_status',
      cell: (info: any) => {
        return (
          <Badge
            className={`${info.row.original.status_code === null ? 'in_progress' : info.row.original?.status_code === true ? 'success' : 'canceled'}`}
          >
            Ro'yxatdan o'tdi
          </Badge>
        )
      },
      header: () => <span>Ariza statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('farmer_name', {
      header: () => 'Korxona nomi',
      cell: (info: any) => {
        return <p>OMAR MCHJ</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('region', {
      header: () => <span>Viloyat</span>,
      cell: () => <span>Andijon</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('district', {
      header: () => <span>Tuman</span>,
      cell: () => <span>Baliqchi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('type', {
      header: () => <span>Sug’urta turi</span>,
      cell: (info: any) => {
        return <p>Sug'urti turi</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: () => <span>Ariza sanasi</span>,
      cell: (info: any) => {
        return <p>{dayjs(info.row.original.date).format(DATE_FORMAT)}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('check_status', {
      header: () => <span>Statusni belgilash</span>,
      footer: info => info.column.id,
      cell: (info: any) => (
        <Stack direction='row' spacing={2}>
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
            Yaratish
          </Button>
        </Stack>
      ),
    }),
  ]

  const data: IColumns[] = [
    {
      number: 1,
      name: "Royxatdan o'tdi",
    },
  ]

  return {
    data,
    columns,
  }
}
