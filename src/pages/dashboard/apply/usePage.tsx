import { useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { ReactComponent as IconCheck } from '@/assets/icons/check.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { ReactComponent as IconEyes } from '@/assets/icons/eyes.svg'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { acceptApplications, getAllApplications } from '@/apis/applications'
import { Badge } from './style'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format'

interface Person {
  number: number
  name: string
  farmer_name: string
  region: string
  district: string
  type: string
  date: string
  check_status?: string
}

const columnHelper = createColumnHelper<Person>()

export const usePage = () => {
  const [rowId, setRowId] = useState(null)
  const [open, setOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS],
    queryFn: getAllApplications,
    select: res => res?.data,
    keepPreviousData: true,
  })

  const handleOpen = (info: any) => {
    setRowId(info?.row?.original?._id)
    setOpen(true)
  }

  const { mutate } = useMutation({
    mutationFn: async data => await acceptApplications(data),
    onSuccess: res => {
      void refetch()
    },
    onError: err => {
      console.log(err)
    },
  })

  const accept = (id: string | any) => {
    mutate(id)
  }

  const reject = (id: string | any) => {
    setRejectOpen(true)
    setRowId(id)
  }

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
            {info.row.original?.status_name}
          </Badge>
        )
      },
      header: () => <span>Ariza statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('farmer_name', {
      header: () => 'Korxona nomi',
      cell: (info: any) => {
        return <p>{info.row.original.farmer_name}</p>
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
        return <p>{info.row.original.type_name}</p>
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
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(8, 112, 95, 0.20)',
            }}
            onClick={() => {
              accept(info?.row?.original?._id)
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
              reject(info?.row?.original?._id)
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
              handleOpen(info)
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
    rowId,
    columns,
    setOpen,
    isLoading,
    rejectOpen,
    setRejectOpen,
  }
}
