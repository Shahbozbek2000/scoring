import { Input } from '@/components/inputs/input'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const Pointers = () => {
  const form = useFormContext()

  return (
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
  )
}
