import { Stack } from '@mui/material'
import { CustomTable } from './components/table'
import { usePage } from './usePage'

const Apply = () => {
  const { data, columns } = usePage()

  return (
    <Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTable data={data} columns={columns} />
      </Stack>
    </Stack>
  )
}

export default Apply
