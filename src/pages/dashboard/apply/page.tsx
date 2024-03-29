import { Stack, Typography } from '@mui/material'
import { usePage } from './usePage'
import { CustomPagination } from '@/components/pagination'
import { ModalForm } from './components/form'
import { Header } from './components/header'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Reject } from './components/reject'
import { CustomTable } from '@/components/table'

const Apply = () => {
  const { open, data, rowId, columns, setOpen, isLoading, rejectOpen, setRejectOpen } = usePage()

  return (
    <Stack>
      <Typography
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        mb='24px'
        fontFamily='GothamProRegular'
      >
        Arizalar
      </Typography>
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
          {data.length > 0 ? <CustomPagination count={data?.length} /> : null}
        </Stack>
        <LoadingOverlay isLoading={isLoading} />
        <ModalForm open={open} setOpen={setOpen} id={rowId} />
        <Reject rejectOpen={rejectOpen} setRejectOpen={setRejectOpen} id={rowId} />
      </Stack>
    </Stack>
  )
}

export default Apply
