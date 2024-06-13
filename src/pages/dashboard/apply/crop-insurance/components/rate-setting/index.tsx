import { acceptApplications } from '@/apis/applications'
import { Input } from '@/components/inputs/input'
import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomModal } from '@/components/modal'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { formSchema } from './form.schema'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { Fragment } from 'react'
import { InputDate } from '@/components/inputs/datepicker'

interface IRateSetting {
  id: string | null | undefined
  rateOpen: boolean
  setRateOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  insurance_rate_percentage: string
  percent?: string
}
export const RateSetting = ({ rateOpen, setRateOpen, id }: IRateSetting) => {
  const queryClient = useQueryClient()
  const form = useForm<FormValues | any>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      insurance_rate_percentage: '',
      percent: '10',
      paymentPercentage: [{ date: '', amount: null }],
    },
  })
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'paymentPercentage',
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
      insurance_rate_percentage: parseFloat(data?.insurance_rate_percentage),
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
              name='insurance_rate_percentage'
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
          <Grid item xs={12} sm={6} md={12}>
            <Typography fontSize={16} fontWeight={400} fontFamily='GothamProRegular'>
              Kontraktning to'lov foizini belgilang
            </Typography>
          </Grid>
          {fields.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Grid item xs={6} sm={4} md={8}>
                  <Input
                    control={form.control}
                    name={`paymentPercentage.${index}.amount`}
                    placeholder='Tarif'
                    type='number'
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <InputDate control={form.control} name={`paymentPercentage.${index}.date`} />
                </Grid>
              </Fragment>
            )
          })}
          <Grid item xs={12} sm={12} md={12} display='flex' justifyContent='center'>
            <Button
              startIcon={<IconPlus />}
              onClick={() => {
                append({
                  amount: null,
                  date: '',
                })
              }}
            >
              To'lov muddati qo‘shish
            </Button>
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
