import { SelectInput } from '@/components/select'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Wrapper } from './style'
import { VegetationChart } from './chart'
import AnimationControls from '../animation-controls'

interface ISelect {
  label: string
  value: string
}

interface INdvi {
  dates: ISelect[]
  series: number[]
  categories: string[]
}

export const NDVI = ({ dates, series, categories }: INdvi) => {
  const form = useFormContext()

  const handleDateChange = (newDate: string) => {
    form.setValue('date', newDate)
  }

  return (
    <Wrapper>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} mb='32px'>
        <Grid item xs={6} sm={4} md={4}>
          <AnimationControls
            dates={dates}
            currentDate={form.watch('date')}
            onDateChange={handleDateChange}
            control={form.control}
          />
        </Grid>
      </Grid>
      <VegetationChart series={series} categories={categories} />
    </Wrapper>
  )
}
