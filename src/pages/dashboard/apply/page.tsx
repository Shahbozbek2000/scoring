import { Stack } from '@mui/material'
import { CustomTable } from './components/table'
import { usePage } from './usePage'
import { CustomPagination } from '@/components/pagination'
import { ModalForm } from './components/form'
import { Header } from './components/header'
import { LoadingOverlay } from '@/components/loading-overlay'

const Apply = () => {
  const { open, data, columns, setOpen, isLoading } = usePage()

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
        <ModalForm open={open} setOpen={setOpen} />
      </Stack>
      <LoadingOverlay isLoading={isLoading} />
    </Stack>
  )
}

export default Apply
