import { Stack } from '@mui/material'
import BreadcrumpCustom from '@/components/breadcrumb'
import { CustomTabs } from './components/tabs'
import { usePage } from './usePage'
import { LoadingOverlay } from '@/components/loading-overlay'
import { MapContainer } from './style'
import { FormProvider } from 'react-hook-form'
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn.js'

const LandAreas = () => {
  const { ref, form, data, value, dates, setValue, isLoading } = usePage()

  const series = data?.map((item: any) => Number(item?.average_ndvi)?.toFixed(2))
  const categories = data?.map((item: any) => dayjs(item?.time).locale('uz-latn').format('DD MMM'))

  return (
    <Stack>
      <BreadcrumpCustom />
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
          />
        </FormProvider>
      </Stack>
      <LoadingOverlay isLoading={isLoading} />
    </Stack>
  )
}

export default LandAreas
