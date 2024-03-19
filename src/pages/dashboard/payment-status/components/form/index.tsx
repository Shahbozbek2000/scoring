import { Input } from '@/components/inputs/input'
import { CustomModal } from '@/components/modal'
import { COLORS } from '@/constants/css'
import { Button, Grid, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'

interface ISetPayStatus {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  apply_number: string
  payment_date: string
  inn: number
  contract_number: number
  price: string
}

export const SetPaymentStatus = ({ open, setOpen }: ISetPayStatus) => {
  const form = useForm<FormValues>()

  const onSet: SubmitHandler<FormValues> = data => {
    console.log(data)
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Proweb korxonasining to’lov holatini belgilash'
      maxWidth='md'
    >
      <Form onSubmit={form.handleSubmit(onSet)}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='apply_number'
              placeholder='Ariza raqami'
              label='Ariza raqami'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='payment_date'
              placeholder='To’lov sanasi'
              label='To’lov sanasi'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='inn' placeholder='INN' label='INN' type='number' />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='contract_number'
              placeholder='Shartnoma raqami'
              label='Shartnoma raqami'
              type='number'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='price' placeholder='Summa' label='Summa' />
          </Grid>
        </Grid>
        <Stack direction='row' sx={{ paddingTop: '32px' }} spacing={2}>
          <Button
            variant='outlined'
            sx={{
              color: COLORS.RED,
              borderRadius: '8px',
              border: `1.5px solid ${COLORS.RED} !important`,
            }}
          >
            To’lov amalga oshirilmagan
          </Button>
          <Button variant='contained' sx={{ background: '#08705F', opacity: 0.7 }} type='submit'>
            To’lov amalga oshirilgan
          </Button>
        </Stack>
      </Form>
    </CustomModal>
  )
}
