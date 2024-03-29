import { acceptApplications } from '@/apis/applications'
import { Input } from '@/components/inputs/input'
import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomModal } from '@/components/modal'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Stack } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { formSchema } from './form.schema'

interface IRateSetting {
  id: string | null | undefined
  rateOpen: boolean
  setRateOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  interest_rate_percentage: string
  percent?: string
}
export const RateSetting = ({ rateOpen, setRateOpen, id }: IRateSetting) => {
  const queryClient = useQueryClient()
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      interest_rate_percentage: '',
      percent: '10',
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async data => await acceptApplications(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS] })
      setRateOpen(false)
    },
    onError: err => {
      console.log(err)
    },
  })

  const onSetting: SubmitHandler<FormValues> = data => {
    const payload: any = {
      interest_rate_percentage: parseFloat(data?.interest_rate_percentage),
    }
    mutate(payload)
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
            <Input
              control={form.control}
              name='interest_rate_percentage'
              placeholder='Tarif'
              type='number'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='percent'
              placeholder='Foiz'
              type='number'
              disabled
            />
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
          <Button variant='contained' type='submit' sx={{ opacity: 0.7 }}>
            Shartnomani shakllantirish
          </Button>
        </Stack>
      </Form>
      <LoadingOverlay isLoading={isLoading} />
    </CustomModal>
  )
}
