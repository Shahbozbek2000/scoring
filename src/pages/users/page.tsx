import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { Table } from './compoents/table'
import { useBoolean } from '@/hooks/useBoolean'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from './compoents/forms'
import { useUserStore } from '@/store/user'
import dayjs from 'dayjs'
import { type SchemaType, schema } from './form.schema'

const Users = () => {
  const { value, setFalse, setTrue } = useBoolean()

  const form = useForm<SchemaType>({
    defaultValues: {
      phones: [{ phone: '' }],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const setUser = useUserStore(state => state.setUser)
  const updateUser = useUserStore(state => state.updateUser)

  const onSubmit = (data: SchemaType) => {
    if (data?.id) {
      updateUser(data)
    } else {
      setUser({ ...data, id: `${dayjs().valueOf()}` })
    }
    form.reset({})
    setFalse()
  }

  return (
    <FormProvider {...form}>
      <Stack gap='24px' width='100%'>
        <Typography component='h1' variant='h4'>
          Foydalanuvchilar
        </Typography>
        <Stack ml='auto' width='230px'>
          <Button onClick={setTrue} size='small'>
            Foydalanuvchi qo'shish
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table setTrue={setTrue} />
        </TableContainer>

        <Dialog scroll='body' open={value} onClose={setFalse}>
          <Stack
            width='400px'
            gap='16px'
            padding='20px'
            component='form'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Typography>Foydalanuvchi yaratish</Typography>
            <Form />
            <Button type='submit' fullWidth>
              {form.getValues('id') ? 'Tahrirlash' : 'Yaratish'}
            </Button>
          </Stack>
        </Dialog>
      </Stack>
    </FormProvider>
  )
}

export default Users
