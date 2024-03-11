import { IconButton, Stack } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import { ReactComponent as IconCheck } from '@/assets/icons/check.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { ReactComponent as IconEyes } from '@/assets/icons/eyes.svg'
import { status } from '@/constants/status'
import { Badge } from './style'
import { getStatus } from '@/utils/status'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getAllApplications } from '@/apis/applications'

interface Person {
  number: number
  apply_status: string
  company_name: string
  region: string
  district: string
  insurance_type: string
  apply_date: string
  check_status?: string
}

const columnHelper = createColumnHelper<Person>()

export const usePage = () => {
  const [open, setOpen] = useState(false)

  useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS],
    queryFn: getAllApplications,
    onSuccess: res => {
      console.log(res, 'resssss')
    },
  })

  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.getValue(),
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.apply_status, {
      id: 'apply_status',
      cell: info => {
        console.log(info.getValue(), 'get-values')
        return <Badge className={info.getValue()}>{getStatus(info.getValue())}</Badge>
      },
      header: () => <span>Ariza statusi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('company_name', {
      header: () => 'Korxona nomi',
      cell: info => info.renderValue(),
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
    columnHelper.accessor('insurance_type', {
      header: () => <span>Sug’urta turi</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('apply_date', {
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

  const data: Person[] = [
    {
      number: 1,
      apply_status: status.success,
      company_name: 'Proweb',
      region: 'Toshkent sh.',
      district: 'Yunusobod',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 2,
      apply_status: status.success,
      company_name: 'RedFox',
      region: 'Samarqand',
      district: 'Qibray',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 3,
      apply_status: status.success,
      company_name: 'Najot talim',
      region: 'Navoiy',
      district: 'Zangiota',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 4,
      apply_status: status.in_progress,
      company_name: 'PDF Academy',
      region: 'Andijon',
      district: 'Asaka',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 5,
      apply_status: status.canceled,
      company_name: 'icon Education',
      region: 'Farg’ona',
      district: 'Quva',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
    {
      number: 6,
      apply_status: status.in_progress,
      company_name: 'RedFox',
      region: 'Samarqand',
      district: 'Qibray',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
    {
      number: 7,
      apply_status: status.success,
      company_name: 'Najot talim',
      region: 'Navoiy',
      district: 'Zangiota',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
    {
      number: 8,
      apply_status: status.in_progress,
      company_name: 'PDF Academy',
      region: 'Andijon',
      district: 'Asaka',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
    {
      number: 9,
      apply_status: status.canceled,
      company_name: 'icon Education',
      region: 'Farg’ona',
      district: 'Quva',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
    {
      number: 10,
      apply_status: status.in_progress,
      company_name: 'PDF Academy',
      region: 'Andijon',
      district: 'Asaka',
      insurance_type: 'Select',
      apply_date: '24.02.2024',
    },
  ]

  return {
    open,
    data,
    columns,
    setOpen,
  }
}
