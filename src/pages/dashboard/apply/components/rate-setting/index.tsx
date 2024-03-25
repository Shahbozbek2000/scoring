import { Input } from '@/components/inputs/input'
import { CustomModal } from '@/components/modal'
import { Button, Grid, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'

interface IRateSetting {
  rateOpen: boolean
  setRateOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  rate: string
  percent: string
}
export const RateSetting = ({ rateOpen, setRateOpen }: IRateSetting) => {
  const form = useForm<FormValues>()

  const onSetting: SubmitHandler<FormValues> = data => {
    console.log(data)
  }

  return (
    <CustomModal
      open={rateOpen}
      setOpen={setRateOpen}
      title='Tarif rejasi (franshiza)'
      fullScreen={false}
      maxWidth='xs'
    >
      <Form onSubmit={form.handleSubmit(onSetting)}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={6} sm={4} md={8}>
            <Input control={form.control} name='rate' placeholder='Tarif' type='number' />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='percent' placeholder='Foiz' type='number' />
          </Grid>
        </Grid>
        <Stack direction='row' spacing={2} sx={{ marginTop: '32px' }}>
          <Button
            variant='outlined'
            onClick={() => {
              setRateOpen(false)
            }}
          >
            Ortga qaytish
          </Button>
          <Button variant='contained' type='submit'>
            Shartnomani shakllantirish
          </Button>
        </Stack>
      </Form>
    </CustomModal>
  )
}
