import { Stack } from '@mui/material'
import { CustomPagination } from '@/components/pagination'
import { Header } from './components/header'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Reject } from './components/reject'
import { CustomTable } from '@/components/table'
import BreadcrumpCustom from '@/components/breadcrumb'
import { usePage } from './usePage'
import { ModalForm } from './components/form'

const ApplyCropInsurance = () => {
  const {
    open,
    data,
    count,
    rowId,
    params,
    columns,
    setOpen,
    setParams,
    isLoading,
    rejectOpen,
    setRejectOpen,
  } = usePage()

  return (
    <Stack>
      <BreadcrumpCustom />
      <Stack gap='32px'>
        <Header />
        <Stack
          width='100%'
          borderRadius='12px'
          p='32px 24px'
          mx='auto'
          gap='24px'
          bgcolor={theme => theme.palette.allColors.WHITE}
        >
          <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
          {data.length > 0 ? (
            <CustomPagination params={params} setParams={setParams} count={count} />
          ) : null}
        </Stack>
        <LoadingOverlay isLoading={isLoading} />
        <ModalForm open={open} setOpen={setOpen} id={rowId} />
        <Reject rejectOpen={rejectOpen} setRejectOpen={setRejectOpen} id={rowId} />
      </Stack>
    </Stack>
  )
}

export default ApplyCropInsurance
