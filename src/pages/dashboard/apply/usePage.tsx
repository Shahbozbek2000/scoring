import { createColumnHelper } from '@tanstack/react-table'

interface Person {
  number: number
  apply_status: string
  company_name: string
  region: string
  district: string
  insurance_type: string
  apply_date: string
}

const columnHelper = createColumnHelper<Person>()

export const usePage = () => {
  const columns = [
    columnHelper.accessor('number', {
      cell: info => info.getValue(),
      header: () => <span>№</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.apply_status, {
      id: 'apply_status',
      cell: info => info.getValue(),
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
  ]

  const data: Person[] = [
    {
      number: 1,
      apply_status: 'Ro’yxatdan o’tdi',
      company_name: 'Proweb',
      region: 'Toshkent sh.',
      district: 'Yunusobod',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 2,
      apply_status: 'Ro’yxatdan o’tdi',
      company_name: 'RedFox',
      region: 'Samarqand',
      district: 'Qibray',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
    {
      number: 3,
      apply_status: 'Ro’yxatdan o’tdi',
      company_name: 'Najot talim',
      region: 'Navoiy',
      district: 'Zangiota',
      insurance_type: 'Select',
      apply_date: '12.02.2024',
    },
  ]

  return {
    data,
    columns,
  }
}
