import { Grid, Stack } from '@mui/material'
import BreadcrumpCustom from '@/components/breadcrumb'
import { usePage } from './usePage'
import { SelectInput } from '@/components/select'
import { MapContainer } from './style'
import { LoadingOverlay } from '@/components/loading-overlay'

const CropLocation = () => {
  const { ref, form, cropTypes, isLoading } = usePage()

  return (
    <Stack>
      <BreadcrumpCustom />
      <Stack
        width='100%'
        borderRadius='12px'
        p='24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={3} sm={4} md={4}>
            <SelectInput
              control={form.control}
              label='Ekin turi'
              name='crop_type'
              options={cropTypes}
              placeholder='Ekin turi'
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='24px'
        mt='24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <MapContainer ref={ref} />
      </Stack>
      <LoadingOverlay isLoading={isLoading} />
    </Stack>
  )
}

export default CropLocation
