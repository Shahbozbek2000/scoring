import { Stack } from '@mui/material'
import { CustomTable } from './components/table'
import { usePage } from './usePage'
import { CustomPagination } from '@/components/pagination'
import { ModalForm } from './components/form'
import { Header } from './components/header'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Reject } from './components/reject'

const Apply = () => {
  const { open, data, columns, setOpen, isLoading, rejectOpen, setRejectOpen } = usePage()

  return (
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
        <CustomTable data={data} columns={columns} />
        {data.length > 0 ? <CustomPagination count={data?.length} /> : null}
      </Stack>
      <LoadingOverlay isLoading={isLoading} />
      <ModalForm open={open} setOpen={setOpen} />
      <Reject rejectOpen={rejectOpen} setRejectOpen={setRejectOpen} />
    </Stack>
  )
}

export default Apply
