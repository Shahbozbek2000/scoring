import { CustomTable } from '@/components/table'
import type { StationData } from '@/types/meteo'
import { Stack, Typography } from '@mui/material'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

interface ISoilAnalysisProps {
  data: StationData[]
}

export const SoilAnalysis = ({ data = [] }: ISoilAnalysisProps) => {
  // Define table columns
  const columns: Array<ColumnDef<any>> = useMemo(
    () => [
      {
        accessorKey: 'depth',
        header: 'Chuqurlik (sm)',
      },
      {
        accessorKey: 'temperature',
        header: 'Harorat (°C)',
        cell: info => info.getValue() ?? 'Maʼlumot yoʻq',
      },
      {
        accessorKey: 'moisture',
        header: 'Namlik (%)',
        cell: info => info.getValue() ?? 'Maʼlumot yoʻq',
      },
    ],
    [],
  )

  // Prepare data for each station
  const prepareTableData = (latestData: any) => [
    {
      depth: '10cm',
      temperature: latestData?.soilTemperature?.depth1 ?? '-',
      moisture: latestData?.soilMoisture?.depth1 ?? '-',
    },
    {
      depth: '20cm',
      temperature: latestData?.soilTemperature?.depth2 ?? '-',
      moisture: latestData?.soilMoisture?.depth2 ?? '-',
    },
    {
      depth: '30cm',
      temperature: latestData?.soilTemperature?.depth3 ?? '-',
      moisture: latestData?.soilMoisture?.depth3 ?? '-',
    },
    {
      depth: '40cm',
      temperature: latestData?.soilTemperature?.depth4 ?? '-',
      moisture: latestData?.soilMoisture?.depth4 ?? '-',
    },
  ]

  return (
    <Stack spacing={4}>
      {data?.map((stationData: StationData) => (
        <Stack key={stationData?.station?.id} spacing={2}>
          <Typography variant='h6' fontFamily='GothamProRegular' fontSize={14} fontWeight={600}>
            {stationData?.station?.name}
          </Typography>
          <CustomTable
            options={{
              data: prepareTableData(stationData?.latestData),
              columns,
            }}
            emptyTitle="Ma'lumot yo'q"
          />
        </Stack>
      ))}
    </Stack>
  )
}
