import { CustomTable } from '@/components/table'
import { Stack, Typography } from '@mui/material'
import { usePage } from './usePage'
import { Filter } from '@/components/filter'
import { CustomPagination } from '@/components/pagination'
import { LoadingOverlay } from '@/components/loading-overlay'

const CoverageInsurance = () => {
  const { data, columns, isLoading, isFetching } = usePage()

  return (
    <Stack>
      <Typography
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        mb='24px'
        fontFamily='GothamProRegular'
      >
        Kreditni qoplash sug’urtasi
      </Typography>
      <Stack gap='32px'>
        <Filter />
        <Stack
          width='100%'
          borderRadius='12px'
          p='32px 24px'
          mx='auto'
          gap='24px'
          bgcolor={theme => theme.palette.allColors.WHITE}
        >
          <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
          {data.length > 0 && <CustomPagination count={36} />}
        </Stack>
        <LoadingOverlay isLoading={isLoading || isFetching} />
      </Stack>
    </Stack>
  )
}

export default CoverageInsurance
