import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomPagination } from '@/components/pagination'
import { CustomTable } from '@/components/table'
import { Stack, Typography } from '@mui/material'
import { usePage } from './usePage'
import { Filter } from '@/components/filter'
import { SetPaymentStatus } from './components/form'

const PaymentStatus = () => {
  const { open, data, columns, setOpen } = usePage()

  return (
    <Stack gap='32px'>
      <Typography
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        fontFamily='GothamProRegular'
      >
        To'lov holati
      </Typography>
      <Stack
        width='100%'
        borderRadius='12px'
        mx='auto'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <Filter />
      </Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
        <CustomPagination count={36} />
      </Stack>
      <LoadingOverlay isLoading={false} />
      <SetPaymentStatus open={open} setOpen={setOpen} />
    </Stack>
  )
}

export default PaymentStatus
