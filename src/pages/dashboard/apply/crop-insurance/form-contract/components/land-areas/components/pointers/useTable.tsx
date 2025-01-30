import type { CreditAreaContour } from '@/types/credit-area'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'

const columnHelper = createColumnHelper<any>()

interface ITableProps {
  pointerData: CreditAreaContour[]
}

export const useTable = ({ pointerData }: ITableProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('number', {
        cell: info => info.row.index + 1,
        header: () => <span>№</span>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor('cad_number', {
        header: () => 'Kadastr raqami',
        footer: info => info.column.id,
      }),
      columnHelper.accessor('contour_number', {
        header: () => <span>Kontur raqami</span>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor('ball_bonitet', {
        header: () => <span>Ball boniteti</span>,
        cell: ({ row }) => {
          return <p>Hosil sug'urtasi</p>
        },
        footer: info => info.column.id,
      }),
    ],
    [],
  )

  return {
    data:
      pointerData?.map((point: any) => {
        const properties = point?.data?.features?.[0]?.properties
        return {
          cad_number: properties?.cad_number ?? '-',
          contour_number: properties?.contour_number ?? '-',
          ball_bonitet: properties?.ball_bonitet ?? '-',
        }
      }) || [],
    columns,
  }
}
