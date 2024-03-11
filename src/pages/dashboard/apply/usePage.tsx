import { IconButton, Stack } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { ReactComponent as IconCheck } from '@/assets/icons/check.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { ReactComponent as IconEyes } from '@/assets/icons/eyes.svg'
import { Badge } from './style'
import { getStatus } from '@/utils/status'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getAllApplications } from '@/apis/applications'

interface Person {
  number: number
  name: string
  full_name: string
  region: string
  district: string
  type: string
  date: string
  check_status?: string
}

const columnHelper = createColumnHelper<Person>()

export const usePage = () => {
  const [open, setOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const { data = [], isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS],
    queryFn: getAllApplications,
    select: res => res?.data,
    keepPreviousData: true,
  })

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
            className={`${info.row.original.status?.code === 1 ? 'in_progress' : info.row.original.status?.code === 2 ? 'success' : 'canceled'}`}
          >
            {getStatus(info.row.original.status?.code)}
          </Badge>
        )
      },
      header: () => <span>Ariza statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('full_name', {
      header: () => 'Korxona nomi',
      cell: (info: any) => {
        return <p>{info.row.original.farmer?.full_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('region', {
      header: () => <span>Viloyat</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('district', {
      header: () => <span>Tuman</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('type', {
      header: () => <span>Sug’urta turi</span>,
      cell: (info: any) => {
        return <p>{info.row.original.type?.name}</p>
      },
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
        <Stack direction='row' spacing={2}>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(8, 112, 95, 0.20)',
            }}
          >
            <IconCheck />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(235, 87, 87, 0.20)',
            }}
            onClick={() => {
              setRejectOpen(true)
            }}
          >
            <IconClose />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(62, 91, 116, 0.20)',
            }}
            onClick={() => {
              setOpen(true)
            }}
          >
            <IconEyes />
          </IconButton>
        </Stack>
      ),
    }),
  ]

  return {
    open,
    data,
    columns,
    setOpen,
    isLoading,
    rejectOpen,
    setRejectOpen,
  }
}
