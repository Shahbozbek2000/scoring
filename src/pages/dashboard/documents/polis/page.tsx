import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomPagination } from '@/components/pagination'
import { CustomTable } from '@/components/table'
import { Stack } from '@mui/material'
import { usePage } from './usePage'

const Polis = () => {
  const { data, params, columns, setParams } = usePage()

  return (
    <Stack gap='32px'>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      ></Stack>
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
        <CustomPagination count={data.length} params={params} setParams={setParams} />
      </Stack>
      <LoadingOverlay isLoading={false} />
    </Stack>
  )
}

export default Polis
