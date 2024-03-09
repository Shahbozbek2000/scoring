import { Stack } from '@mui/material'
import { CustomTable } from './components/table'
import { usePage } from './usePage'
import { CustomPagination } from '@/components/pagination'
import { ModalForm } from './components/form'
import { Header } from './components/header'

const Apply = () => {
  const { open, data, columns, setOpen } = usePage()

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
        <CustomPagination />
        <ModalForm open={open} setOpen={setOpen} />
      </Stack>
    </Stack>
  )
}

export default Apply
