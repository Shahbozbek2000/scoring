import { Input } from '@/components/inputs/input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { type SchemaType } from '../../form.schema'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { InputCheckbox } from '@/components/inputs/input-checkbox'

export const Form = () => {
  const form = useFormContext<SchemaType>()
  const { fields, append, remove } = useFieldArray({
    name: 'phones',
    control: form.control,
  })

  const handleUpdate = () => {
    append({
      phone: '',
    })
  }
  const handleRemove = () => {
    remove(-1)
  }
  const handleClose = () => {
    form.setValue('checkbox', false)
  }
  return (
    <>
      <Input
        fullWidth
        name='name'
        label='Ism'
        control={form.control}
        placeholder='Foydalanuvchi simini kiriting!'
      />
      <Input
        fullWidth
        name='firstname'
        label='Familiya'
        control={form.control}
        placeholder='Foydalanuvchi familiyasini kiriting!'
      />
      <Divider />
      {fields.map((f, index) => (
        <Input
          key={f.id}
          fullWidth
          name={`phones.${index}.phone`}
          label='Telefon raqam'
          control={form.control}
          inputProps={{
            pattern: '[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}',
            title: 'Telefon raqam example: (902339809)',
          }}
          type='tel'
          placeholder='Telefon raqam kiriting'
        />
      ))}

      <Stack width='100%' direction='row' justifyContent='flex-end' gap='16px'>
        <Button onClick={handleRemove} size='small' variant='outlined'>
          O'chirish
        </Button>
        <Button onClick={handleUpdate} size='small' variant='outlined'>
          Yaratish
        </Button>
      </Stack>
      <Divider />
      <InputCheckbox label='Qo`shimcha ma`lumotlar' control={form.control} name='checkbox' />

      <Dialog scroll='body' open={!!form.watch('checkbox')} onClose={handleClose}>
        <Stack width='400px' gap='16px' padding='20px'>
          <Typography>Qo'shimcha ma'lumotlar</Typography>
          <Input
            fullWidth
            name='country'
            label='Davlat'
            control={form.control}
            placeholder='Davlat kiriting!'
          />
          <Input
            fullWidth
            name='language'
            label='Til'
            control={form.control}
            placeholder='Til kiriting!'
          />
          <Button onClick={handleClose} fullWidth>
            Yashirish
          </Button>
        </Stack>
      </Dialog>
    </>
  )
}
