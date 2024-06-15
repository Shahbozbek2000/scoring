import { Input } from '@/components/inputs/input'
import { TextArea } from '@/components/inputs/input-textarea'
import { LoadingOverlay } from '@/components/loading-overlay'
import { CustomModal } from '@/components/modal'
import { COLORS } from '@/constants/css'
import type { IModal } from '@/types/modal'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { useReset } from './useReset'
import { RateSetting } from '../rate-setting'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rejectApplications } from '@/apis/applications'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import toast from 'react-hot-toast'
import { InputCheckbox } from '@/components/inputs/input-checkbox'

export const ModalForm = ({ open, setOpen, id }: IModal) => {
  const form = useForm()
  const queryClient = useQueryClient()
  const [isCanceled, setIsCanceled] = useState(false)
  const { data, isLoading } = useReset({ id, form })
  const [rateOpen, setRateOpen] = useState(false)
  const isDisabled = data?.status_code === false || data?.status_code === true

  const { mutate } = useMutation({
    mutationFn: async data => await rejectApplications(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS] })
      setOpen(false)
      toast.success('Ariza rad etildi')
    },
    onError: err => {
      console.log(err)
      toast.error('Nimadur xatolik yuz berdi')
    },
  })
  const onReject: SubmitHandler<any> = data => {
    const payload: any = { id, comment: data?.comment }
    mutate(payload)
  }

  return (
    <Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Kreditning qaytarilmaslik xatarini sug‘urta qilish bo‘yicha so‘rovnoma-ariza'
      >
        <Form onSubmit={form.handleSubmit(onReject)}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={6} md={6}>
              <Input
                control={form.control}
                name='number'
                placeholder='Sug‘urta qildiruvchi (bank)'
                label='Sug‘urta qildiruvchi (bank)'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Input
                control={form.control}
                name='date'
                placeholder='Qarz oluvchi'
                label='Qarz oluvchi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Input
                control={form.control}
                name='date'
                placeholder='Kredit shartnomasi'
                label='Kredit shartnomasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Input
                control={form.control}
                name='date'
                placeholder='Kredit shartnomasining valyutasi'
                label='Kredit shartnomasining valyutasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Input
                control={form.control}
                name='date'
                placeholder='Kredit miqdori'
                label='Kredit miqdori'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                control={form.control}
                name='date'
                placeholder='Kredit muddati'
                label='Kredit muddati'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                control={form.control}
                name='date'
                placeholder='Sug‘urta shartnomasining valyutasi'
                label='Sug‘urta shartnomasining valyutasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                control={form.control}
                name='date'
                placeholder='Sug‘urta summasi'
                label='Sug‘urta summasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                control={form.control}
                name='date'
                placeholder='Sug‘urta davri'
                label='Sug‘urta davri'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextArea
                control={form.control}
                name='comment'
                placeholder='Kreditning boshqa tafsilotlari'
                label='Kreditning boshqa tafsilotlari'
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#60676D', fontFamily: 'GothamProRegular' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                sx={{
                  fontFamily: 'GothamProRegular',
                  fontSize: 16,
                  color: 'var(--dark)',
                  margin: '8px 0',
                }}
              >
                Sug‘urta tavakkalchiliklari
              </Typography>
              <Grid container spacing={{ xs: 2, md: 2 }}>
                <Grid item xs={6} sm={4} md={6}>
                  <InputCheckbox
                    control={form.control}
                    name='risk_factors_climatic'
                    label='Surunkali yomg‘ir yog‘ishi xamda yog‘ingarchilikdan so‘ng xavo xaroratini 
              keskin isib ketishi natijasida tuproqning yuqori qatlamini qatqaloq bo‘lishi.'
                    labelPlacement='start'
                    sx={{
                      fontFamily: 'GothamProRegular !important',
                      marginLeft: 0,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={6}>
                  <InputCheckbox
                    control={form.control}
                    name='risk_factors_dehydration'
                    label='qurg‘oqchilik, yong‘in, bo‘ron, do‘l, kuchli yomg‘ir (jala), garmsel, qorasovuq,
               suv toshqini, yashin urishi, uchuvchi apparatlari va ularning qoldiqlarining tushishi'
                    labelPlacement='start'
                    sx={{
                      fontFamily: 'GothamProRegular !important',
                      marginLeft: 0,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={6}>
                  <InputCheckbox
                    control={form.control}
                    name='risk_factors_insects'
                    label='Uchinchi shaxslar tomonidan sug‘urta qilingan paxta xom ashyosi ekinlari va/yoki ularning hosili 
              vegityatsiya davrida qasddan yo‘q qilinishi yoki shikastlantirilishi.'
                    labelPlacement='start'
                    sx={{
                      fontFamily: 'GothamProRegular !important',
                      marginLeft: 0,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={6}>
                  <InputCheckbox
                    control={form.control}
                    name='risk_factors_third_party'
                    label='Zararkunanda xashoratlar yoki kasalliklarni Epifitotik xususiyatga ko‘ra tarqalishi'
                    labelPlacement='start'
                    sx={{
                      fontFamily: 'GothamProRegular !important',
                      marginLeft: 0,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                sx={{
                  fontFamily: 'GothamProRegular',
                  fontSize: 16,
                  color: 'var(--dark)',
                  margin: '8px 0',
                }}
              >
                Sug‘urta qiymati va sug‘urta summasi
              </Typography>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                sx={{ paddingBottom: isCanceled ? '8px' : '32px' }}
              >
                <Grid item xs={6} sm={4} md={4}>
                  <Input
                    control={form.control}
                    name='insurance_amount'
                    placeholder='Sug‘urta qiymati, so‘m'
                    label='Sug‘urta qiymati (mahsulot qiymati), so‘m'
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Input
                    control={form.control}
                    name='insurance_price'
                    placeholder='Sug‘urta summasi, so‘m'
                    label='Sug‘urta summasi (sug‘urta javobgarligi), so‘m'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {isCanceled && (
            <Grid container sx={{ paddingBottom: '32px' }}>
              <Grid item xs={6} sm={4} md={4}>
                <TextArea
                  control={form.control}
                  name='comment'
                  placeholder='Arizani rad etish sababini kiriting'
                  label='Arizani rad etish sababini kiriting'
                />
              </Grid>
            </Grid>
          )}
          <Stack direction='row' spacing={2}>
            {isDisabled ? null : (
              <Fragment>
                {isCanceled ? (
                  <Button
                    variant='outlined'
                    sx={{
                      color: COLORS.RED,
                      borderRadius: '8px',
                      border: `1.5px solid ${COLORS.RED} !important`,
                    }}
                    type='submit'
                  >
                    Rad etish
                  </Button>
                ) : (
                  <Button
                    variant='outlined'
                    sx={{
                      color: COLORS.RED,
                      borderRadius: '8px',
                      border: `1.5px solid ${COLORS.RED} !important`,
                    }}
                    onClick={() => {
                      setIsCanceled(true)
                    }}
                  >
                    Rad etish
                  </Button>
                )}
              </Fragment>
            )}

            <Button
              variant='contained'
              sx={{ background: '#08705F', opacity: 0.7 }}
              onClick={() => {
                setRateOpen(true)
                setOpen(false)
              }}
              disabled={isDisabled}
            >
              Tarifni belgilash
            </Button>
          </Stack>
        </Form>
        <LoadingOverlay isLoading={isLoading} />
      </CustomModal>
      <RateSetting rateOpen={rateOpen} setRateOpen={setRateOpen} id={id} />
    </Fragment>
  )
}
