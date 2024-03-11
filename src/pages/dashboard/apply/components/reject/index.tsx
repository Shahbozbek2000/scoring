import { TextArea } from '@/components/inputs/input-textarea'
import { CustomModal } from '@/components/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from './form.schema'
import { Form } from 'react-router-dom'
import { COLORS } from '@/constants/css'

interface IRejectProps {
  rejectOpen: boolean
  setRejectOpen: Dispatch<SetStateAction<boolean>>
}

interface FormValues {
  comment: string
}

export const Reject = ({ rejectOpen, setRejectOpen }: IRejectProps) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })

  const onReject = (data: FormValues) => {
    console.log('reject', data)
  }

  return (
    <CustomModal open={rejectOpen} setOpen={setRejectOpen} title='Rad etish sababi' maxWidth='sm'>
      <Form onSubmit={form.handleSubmit(onReject)}>
        <TextArea control={form.control} placeholder='Rad etish sababi' name='comment' />
        <Stack direction='row' width='100%' justifyContent='flex-end' marginTop='18px' spacing={2}>
          <Button
            sx={{ width: 140, border: `1px solid ${COLORS.RED} !important`, color: COLORS.RED }}
            variant='outlined'
            onClick={() => {
              setRejectOpen(false)
            }}
          >
            Bekor qilish
          </Button>
          <Button sx={{ width: 140 }} type='submit'>
            Rad etish
          </Button>
        </Stack>
      </Form>
    </CustomModal>
  )
}
