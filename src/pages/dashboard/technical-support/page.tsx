import { Stack } from '@mui/material'
import { CustomTable } from '@/components/table'
import { CustomPagination } from '@/components/pagination'
import { LoadingOverlay } from '@/components/loading-overlay'
import { usePage } from './usePage'
import BreadcrumpCustom from '@/components/breadcrumb'

const TechnicalSupport = () => {
  const { data, params, columns, setParams } = usePage()

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
    </Stack>
  )
}

export default TechnicalSupport
