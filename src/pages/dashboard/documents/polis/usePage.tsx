import { request } from '@/configs/requests'
import { DATE_FORMAT } from '@/constants/format'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { DocumentItem, DocumentResponse } from '@/types/signed-documents'
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const columnHelper = createColumnHelper<DocumentItem>()

export const usePage = () => {
  const { search } = useLocation()
  const initial_params = new URLSearchParams(search)
  const [params, setParams] = useState({
    page: initial_params.has('page') ? Number(initial_params.get('page')) : 1,
    limit: initial_params.has('limit') ? Number(initial_params.get('limit')) : 10,
  })

  const {
    data = {
      count: 0,
      results: [],
    },
    isLoading,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_POLICY, params],
    queryFn: async () => await request<DocumentResponse>('contract/policy/get/all', { params }),
    select: res => {
      return {
        count: res?.data?.count,
        results: res?.data?.result,
      }
    },
    keepPreviousData: true,
  })

  const columns = [
    columnHelper.accessor('number', {
      cell: info => {
        const currentPage = params?.page
        const limit = params?.limit
        const rowIndex = info?.row?.index
        return (currentPage - 1) * limit + rowIndex + 1
      },
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('number', {
      header: () => <span>Ariza raqami</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('createdAt', {
      header: () => <span>Sana</span>,
      cell: ({ row }) => {
        return (
          <p style={{ textAlign: 'center' }}>{dayjs(row.original.createdAt).format(DATE_FORMAT)}</p>
        )
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('type_name', {
      header: () => <span>Sug’urta turi</span>,
      cell: ({ row }) => {
        return <p style={{ textAlign: 'center' }}>{row.original.type_name ?? '-'}</p>
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor('actions', {
      header: () => <span>Polisni ko'rish</span>,
      cell: ({ row }) => {
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
            onClick={() => {
              window.open(row.original?.signer, '_blank')
            }}
          >
            Ko'rish
          </Button>
        )
      },
      footer: info => info.column.id,
    }),
  ]

  return {
    data: data.results,
    params,
    columns,
    setParams,
    isLoading,
  }
}
