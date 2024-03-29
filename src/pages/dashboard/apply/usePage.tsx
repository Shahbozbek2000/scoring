import { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { acceptApplications, getAllApplications } from '@/apis/applications'
import { Badge } from './style'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format'
import { CheckStatus } from './components/status'

interface Person {
  number: number
  name: string
  farmer_name: string
  region: string
  district: string
  type_name: string
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
    mutationFn: async data =>
      await acceptApplications(data, {
        insurance_liability: '10',
      }),
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
      cell: ({ row }: any) => {
        return (
          <Badge
            className={`${row.original.status_code === null ? 'in_progress' : row.original?.status_code === true ? 'success' : 'canceled'}`}
          >
            {row.original?.status_name}
          </Badge>
        )
      },
      header: () => <span>Ariza statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('farmer_name', {
      header: () => 'Korxona nomi',
      cell: ({ row }) => {
        return <p>{row.original.farmer_name}</p>
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
    columnHelper.accessor('type_name', {
      header: () => <span>Sug’urta turi</span>,
      cell: ({ row }) => {
        return <p>{row.original.type_name}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: () => <span>Ariza sanasi</span>,
      cell: ({ row }) => {
        return <p>{dayjs(row.original.date).format(DATE_FORMAT)}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('check_status', {
      header: () => <span>Statusni belgilash</span>,
      footer: info => info.column.id,
      cell: (info: any) => (
        <CheckStatus
          id={info?.row?.original?._id}
          status_code={info.row.original.status_code}
          accept={() => {
            accept(info?.row?.original?._id)
          }}
          reject={() => {
            reject(info?.row?.original?._id)
          }}
          handleOpen={() => {
            handleOpen(info)
          }}
          info={info}
        />
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
