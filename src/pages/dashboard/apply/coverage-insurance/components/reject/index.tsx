import type { Dispatch, SetStateAction } from 'react'
import { TextArea } from '@/components/inputs/input-textarea'
import { CustomModal } from '@/components/modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { formSchema } from './form.schema'
import { Form } from 'react-router-dom'
import { COLORS } from '@/constants/css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rejectApplications } from '@/apis/applications'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { LoadingOverlay } from '@/components/loading-overlay'

interface IRejectProps {
  rejectOpen: boolean
  setRejectOpen: Dispatch<SetStateAction<boolean>>
  id: string | null
}

interface FormValues {
  comment: string
}

export const Reject = ({ rejectOpen, setRejectOpen, id }: IRejectProps) => {
  const queryClient = useQueryClient()
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async data => await rejectApplications(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS] })
      setRejectOpen(false)
    },
    onError: err => {
      console.log(err)
    },
  })

  const onReject: SubmitHandler<FormValues> = data => {
    const payload: any = { id, comment: data?.comment }
    mutate(payload)
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
      <LoadingOverlay isLoading={isLoading} />
    </CustomModal>
  )
}
