import { Input } from '@/components/inputs/input'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
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

export const ModalForm = ({ open, setOpen, id }: IModal) => {
  const form = useForm()
  const queryClient = useQueryClient()
  const [isCanceled, setIsCanceled] = useState(false)
  const { isLoading } = useReset({ id, form })
  const [rateOpen, setRateOpen] = useState(false)

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
      <CustomModal open={open} setOpen={setOpen} title='Anketa generatsiya qilish'>
        <Form onSubmit={form.handleSubmit(onReject)}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='number'
                placeholder='Ariza raqami'
                label='Ariza raqami'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='date'
                placeholder='Sana'
                label='Sana'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4} />
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='region'
                placeholder='Viloyat'
                label='Viloyat'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='district'
                placeholder='Tuman'
                label='Tuman'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: 'var(--dark)',
              margin: '8px 0',
            }}
          >
            Sug’urta qildiruvchi to`g’risidagi ma’lumot
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='farmer_name'
                placeholder='To`liq nomi'
                label='To`liq nomi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='farmer_stir'
                placeholder='STIR raqami'
                label='STIR raqami'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='farmer_requisites'
                placeholder='Bank rekvizitlari'
                label='Bank rekvizitlari'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='creditor_address'
                placeholder='Yuridik manzili'
                label='Yuridik manzili'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: 'var(--dark)',
              margin: '8px 0',
            }}
          >
            Naf oluvchi to‘g‘risida ma’lumot
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='creditor_name'
                placeholder='To`liq nomi'
                label='To`liq nomi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='creditor_stir'
                placeholder='STIR raqami'
                label='STIR raqami'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='creditor_requisites'
                placeholder='Bank rekvizitlari'
                label='Bank rekvizitlari'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='creditor_address'
                placeholder='Yuridik manzili'
                label='Yuridik manzili'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: 'var(--dark)',
              margin: '8px 0',
            }}
          >
            Sug‘urtalash so‘ralgan ekinlar haqida asosiy ma’lumotlar
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_name'
                placeholder='Q/x ekini nomi'
                label='Q/x ekini nomi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_area'
                placeholder='Ekin (ko‘chat) maydoni, ga'
                label='Ekin (ko‘chat) maydoni, ga'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_fertility_norm'
                placeholder='Me’yoriy hosildorlik, s/ga'
                label='Me’yoriy hosildorlik, s/ga'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_price'
                placeholder='Hosilni 1 tn narxi, so‘m'
                label='Hosilni 1 tn narxi, so‘m'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_actual_harvest'
                placeholder='Yalpi hosil, tn'
                label='Yalpi hosil, tn'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='legal_location2'
                placeholder='Terim-yig‘im muddati'
                label='Terim-yig‘im muddati'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_harvest_start'
                placeholder='Boshlash sanasi'
                label='Boshlash sanasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='crop_harvest_end'
                placeholder='Yakunlash sanasi'
                label='Yakunlash sanasi'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: 'var(--dark)',
              margin: '8px 0',
            }}
          >
            Sug‘urtalash hududi
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='credit_area_region_code'
                placeholder='Viloyat'
                label='Viloyat'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='credit_area_district_code'
                placeholder='Tuman'
                label='Tuman'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='credit_area_massiv_code'
                placeholder='Hudud (massiv)'
                label='Hudud (massiv)'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='credit_area_contour_numbers'
                placeholder='Kontur raqamlari'
                label='Kontur raqamlari'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
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

            <Button
              variant='contained'
              sx={{ background: '#08705F', opacity: 0.7 }}
              onClick={() => {
                setRateOpen(true)
                setOpen(false)
              }}
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
