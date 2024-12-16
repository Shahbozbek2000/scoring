import { Input } from '@/components/inputs/input'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'

export const Pointers = () => {
  const form = useForm()

  return (
    <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={6} sm={4} md={4}>
        <Input
          control={form.control}
          name='company_name'
          placeholder='Korxona nomi'
          label='Korxona nomi'
        />
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <Input
          control={form.control}
          name='area'
          placeholder='Maydoni'
          label='Maydoni'
          type='number'
        />
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <Input control={form.control} name='pin' placeholder='INN' label='INN' />
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <Input
          control={form.control}
          name='cadastr_number'
          placeholder='Kadastr raqami'
          label='Kadastr raqami'
          type='number'
        />
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <Input
          control={form.control}
          name='example_number'
          placeholder='Namuna raqami'
          label='Namuna raqami'
          type='number'
        />
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <Input
          control={form.control}
          name='crop_type'
          placeholder='Hosil turi'
          label='Hosil turi'
        />
      </Grid>
    </Grid>
  )
}
