import { Stack, Typography } from '@mui/material'
import { CustomTable } from '@/components/table'
import { CustomPagination } from '@/components/pagination'
import { LoadingOverlay } from '@/components/loading-overlay'
import { usePage } from './usePage'

const TechnicalSupport = () => {
  const { data, columns } = usePage()

  return (
    <Stack gap='32px'>
      <Typography
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        fontFamily='GothamProRegular'
      >
        Texnik yordam
      </Typography>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
        <CustomPagination count={38} />
      </Stack>
      <LoadingOverlay isLoading={false} />
    </Stack>
  )
}

export default TechnicalSupport
