import { Grid, Stack } from '@mui/material'
import BreadcrumpCustom from '@/components/breadcrumb'
import { usePage } from './usePage'
import { SelectInput } from '@/components/select'
import { MapContainer } from './style'

const LandAreas = () => {
  const { ref, form, regions, provinces } = usePage()

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
              label='Viloyat'
              name='region_id'
              options={regions}
              placeholder='Viloyat'
            />
          </Grid>
          <Grid item xs={3} sm={4} md={4}>
            <SelectInput
              control={form.control}
              label='Tuman'
              name='district_id'
              options={provinces}
              placeholder='Tuman'
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
    </Stack>
  )
}

export default LandAreas
