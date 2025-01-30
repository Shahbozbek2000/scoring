import { Stack } from '@mui/material'
import { CustomTabs } from './components/tabs'
import { usePage } from './usePage'
import { LoadingOverlay } from '@/components/loading-overlay'
import { MapContainer } from './style'
import { FormProvider } from 'react-hook-form'
import type { CreditAreaContour } from '@/types/credit-area'
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn.js'
import 'leaflet-fullscreen'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

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
    ? data?.map((item: any) => dayjs(item?.time).locale('uz-latn').format('DD MMM'))
    : []

  return (
    <Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <MapContainer ref={ref} />
        <FormProvider {...form}>
          <CustomTabs
            value={value}
            setValue={setValue}
            dates={dates}
            series={series}
            categories={categories}
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
