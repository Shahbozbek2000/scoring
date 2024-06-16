import { CustomTable } from '@/components/table'
import { Stack } from '@mui/material'
import { usePage } from './usePage'
import { Filter } from '@/components/filter'
import { CustomPagination } from '@/components/pagination'
import { LoadingOverlay } from '@/components/loading-overlay'
import BreadcrumpCustom from '@/components/breadcrumb'

const ContractCropInsurance = () => {
  const { data, count, params, columns, setParams, isLoading, isFetching } = usePage()

  return (
    <Stack>
      <BreadcrumpCustom />
      <Stack gap='32px'>
        <Filter />
        <Stack
          width='100%'
          borderRadius='12px'
          p='32px 24px'
          mx='auto'
          gap='24px'
          bgcolor={theme => theme.palette.allColors.WHITE}
        >
          <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas!" />
          {data.length > 0 && (
            <CustomPagination params={params} setParams={setParams} count={count} />
          )}
        </Stack>
        <LoadingOverlay isLoading={isLoading || isFetching} />
      </Stack>
    </Stack>
  )
}

export default ContractCropInsurance
