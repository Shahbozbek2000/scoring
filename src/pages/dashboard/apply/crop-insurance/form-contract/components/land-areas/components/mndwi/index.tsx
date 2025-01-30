import { SelectInput } from '@/components/select'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Wrapper } from './style'
import { VegetationChart } from './chart'

interface ISelect {
  label: string
  value: string
}

interface INdvi {
  dates: ISelect[]
  series: number[]
  categories: string[]
}

export const MNDWI = ({ dates, series, categories }: INdvi) => {
  const form = useFormContext()

  return (
    <Wrapper>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mb='32px'>
        <Grid item xs={6} sm={4} md={4}>
          <SelectInput
            label='Sana'
            name='date'
            control={form.control}
            placeholder='Sana'
            options={dates}
          />
        </Grid>
      </Grid>
      <VegetationChart series={series} categories={categories} />
    </Wrapper>
  )
}
