import { CustomTable } from '@/components/table'
import { Stack } from '@mui/material'
import { usePage } from './usePage'
import { Filter } from '@/components/filter'
import { CustomPagination } from '@/components/pagination'

const CoverageInsurance = () => {
  const { data, columns } = usePage()

  return (
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
        {data.length > 0 && <CustomPagination count={36} />}
      </Stack>
    </Stack>
  )
}

export default CoverageInsurance
