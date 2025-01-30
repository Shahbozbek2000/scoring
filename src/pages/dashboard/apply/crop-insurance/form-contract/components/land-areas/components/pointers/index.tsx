import { Input } from '@/components/inputs/input'
import { CustomTable } from '@/components/table'
import { Grid, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTable } from './useTable'
import type { CreditAreaContour } from '@/types/credit-area'
import { useEffect } from 'react'

interface IPointersProps {
  details: any
  pointerData: CreditAreaContour[]
}

export const Pointers = ({ details, pointerData }: IPointersProps) => {
  const form = useFormContext()
  const { data, columns } = useTable({ pointerData })

  useEffect(() => {
    form.reset({
      company_name: details?.farmer_name,
      area: details?.crop_area,
      pin: details?.farmer_stir,
    })
  }, [details, form])
  return (
    <Stack gap='24px'>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6} sm={4} md={4}>
          <Input
            control={form.control}
            name='company_name'
            placeholder='Korxona nomi'
            label='Korxona nomi'
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Input
            control={form.control}
            name='area'
            placeholder='Maydoni'
            label='Maydoni'
            type='number'
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Input
            control={form.control}
            name='pin'
            placeholder='INN'
            label='INN'
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <CustomTable options={{ data, columns }} emptyTitle="Ma'lumot mavjud emas" />
    </Stack>
  )
}
