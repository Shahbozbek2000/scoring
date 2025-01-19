import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomPagination } from '@/components/pagination'
import { CustomTable } from '@/components/table'
import { Stack } from '@mui/material'
import { usePage } from './usePage'
import { SetPaymentStatus } from './components/form'
import BreadcrumpCustom from '@/components/breadcrumb'

const PaymentStatus = () => {
  const { open, data, params, columns, setOpen, setParams } = usePage()

  return (
    <Stack gap='32px'>
      <BreadcrumpCustom />
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
        <CustomPagination params={params} setParams={setParams} count={data.length} />
      </Stack>
      <LoadingOverlay isLoading={false} />
      <SetPaymentStatus open={open} setOpen={setOpen} />
    </Stack>
  )
}

export default PaymentStatus
