import { CustomTable } from '@/components/table'
import { Grid, Stack } from '@mui/material'
import { useTable } from './useTable'
import type { CreditAreaContour } from '@/types/credit-area'
import { Box, Label } from './style'

interface IPointersProps {
  details: any
  pointerData: CreditAreaContour[]
}

export const Pointers = ({ details, pointerData }: IPointersProps) => {
  const { data, columns } = useTable({ pointerData })

  return (
    <Stack gap='24px'>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6} sm={4} md={4}>
          <Stack>
            <Label>Korxona nomi</Label>
            <Box>{details?.farmer_name}</Box>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Stack>
            <Label>Maydoni</Label>
            <Box>{details?.crop_area}</Box>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Stack>
            <Label>INN</Label>
            <Box>{details?.farmer_stir}</Box>
          </Stack>
        </Grid>
      </Grid>
      <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas" />
    </Stack>
  )
}
