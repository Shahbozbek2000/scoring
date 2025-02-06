import { Stack } from '@mui/material'
import { CustomTabs } from './components/tabs'
import { usePage } from './usePage'
import { LoadingOverlay } from '@/components/loading-overlay'
import { MapContainer } from './style'
import { FormProvider } from 'react-hook-form'
import type { CreditAreaContour } from '@/types/credit-area'
import 'leaflet-fullscreen'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import { COLORS } from '@/constants/css'
import { useEffect } from 'react'

interface ILandAreasProps {
  details: any
  pointerData: CreditAreaContour[]
}

const LandAreas = ({ details, pointerData }: ILandAreasProps) => {
  const { ref, form, data, value, dates, setValue, isLoading, meteoData } = usePage({ pointerData })

  const series = Array.isArray(data)
    ? data?.map((item: any) =>
        value === 1
          ? Number(item?.average_ndvi)?.toFixed(2)
          : Number(item?.average_ndwi)?.toFixed(2),
      )
    : []

  const categories = Array.isArray(data)
    ? data?.map((item: any) => {
        const date = new Date(item?.time)
        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        return `${day} ${month}`
      })
    : []

  return (
    <Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={COLORS.WHITE}
      >
        <MapContainer ref={ref} />
        <FormProvider {...form}>
          <CustomTabs
            value={value}
            setValue={setValue}
            dates={dates || []}
            series={series || []}
            categories={categories || []}
            pointerData={pointerData}
            meteoData={meteoData}
            details={details}
          />
        </FormProvider>
      </Stack>
      <LoadingOverlay isLoading={isLoading} />
    </Stack>
  )
}

export default LandAreas
