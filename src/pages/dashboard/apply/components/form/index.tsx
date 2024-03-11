import { Input } from '@/components/inputs/input'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { TextArea } from '@/components/inputs/input-textarea'
import { CustomModal } from '@/components/modal'
import { COLORS } from '@/constants/css'
import type { IModal } from '@/types/modal'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'

export const ModalForm = ({ open, setOpen }: IModal) => {
  const form = useForm()
  const [isCanceled, setIsCanceled] = useState(false)

  return (
    <CustomModal open={open} setOpen={setOpen} title='Anketa generatsiya qilish'>
      <Form>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='apply_number'
              placeholder='Ariza raqami'
              label='Ariza raqami'
              type='number'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='date' placeholder='Sana' label='Sana' />
          </Grid>
          <Grid item xs={6} sm={4} md={4} />
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='region' placeholder='Viloyat' label='Viloyat' />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input control={form.control} name='district' placeholder='Tuman' label='Tuman' />
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
              name='fullname'
              placeholder='To`liq nomi'
              label='To`liq nomi'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='fullname'
              placeholder='STIR raqami'
              label='STIR raqami'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='bank'
              placeholder='Bank rekvizitlari'
              label='Bank rekvizitlari'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location'
              placeholder='Yuridik manzili'
              label='Yuridik manzili'
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
              name='fullname2'
              placeholder='To`liq nomi'
              label='To`liq nomi'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='fullname2'
              placeholder='STIR raqami'
              label='STIR raqami'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='bank2'
              placeholder='Bank rekvizitlari'
              label='Bank rekvizitlari'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Yuridik manzili'
              label='Yuridik manzili'
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
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='fullname2'
              placeholder='Ekin (ko‘chat) maydoni, ga'
              label='Ekin (ko‘chat) maydoni, ga'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='bank2'
              placeholder='Me’yoriy hosildorlik, s/ga'
              label='Me’yoriy hosildorlik, s/ga'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Hosilni 1 tn narxi, so‘m'
              label='Hosilni 1 tn narxi, so‘m'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Yalpi hosil, tn'
              label='Yalpi hosil, tn'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Terim-yig‘im muddati'
              label='Terim-yig‘im muddati'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Boshlash sanasi'
              label='Boshlash sanasi'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Yakunlash sanasi'
              label='Yakunlash sanasi'
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
              name='legal_location2'
              placeholder='Viloyat'
              label='Viloyat'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Tuman'
              label='Tuman'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Hudud (massiv)'
              label='Hudud (massiv)'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
              placeholder='Kontur raqamlari'
              label='Kontur raqamlari'
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
              name='test0'
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
              name='test'
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
              name='test2'
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
              name='test3'
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
              name='legal_location2'
              placeholder='Sug‘urta qiymati, so‘m'
              label='Sug‘urta qiymati (mahsulot qiymati), so‘m'
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Input
              control={form.control}
              name='legal_location2'
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
                name='cancel_info'
                placeholder='Arizani rad etish sababini kiriting'
                label='Arizani rad etish sababini kiriting'
              />
            </Grid>
          </Grid>
        )}
        <Stack direction='row' spacing={2}>
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
          <Button variant='contained' sx={{ background: '#08705F', opacity: 0.7 }}>
            Shartnomaga jo`natish
          </Button>
        </Stack>
      </Form>
    </CustomModal>
  )
}
