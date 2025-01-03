import { Input } from '@/components/inputs/input'
import { TextArea } from '@/components/inputs/input-textarea'
import { COLORS } from '@/constants/css'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Form } from 'react-router-dom'
import { useAppForm } from './useAppForm'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { LoadingOverlay } from '@/components/loading-overlay'

interface IContractFormProps {
  slug: string | undefined
}

export const ContractForm = ({ slug }: IContractFormProps) => {
  const {
    data,
    form,
    onReject,
    isLoading,
    isDisabled,
    isCanceled,
    riskFactors,
    setRateOpen,
    setIsCanceled,
  } = useAppForm({ slug })

  return (
    <>
      {isLoading ? (
        <LoadingOverlay isLoading={isLoading} />
      ) : (
        <Form>
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
            Sug’urta qildiruvchi
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
            Naf oluvchi
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
            Sug‘urtalash hududi
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='credit_area_region_name'
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
                name='credit_area_district_name'
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
                name='credit_area_massiv_name'
                placeholder='Hudud (massiv)'
                label='Hudud (massiv)'
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <div className='contour-numbers'>
                <label>Kontur raqamlari</label>
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }} mt='4px'>
                  {data?.credit_area_contour_numbers?.map((v: any, idx: number) => {
                    return (
                      <button key={idx} type='button'>
                        {v?.number ? v?.number : v}
                      </button>
                    )
                  })}
                </Stack>
              </div>
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
            Sug‘urtalash uchun so‘ralgan ekinlar
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
          </Grid>
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: 'var(--dark)',
              margin: '8px 0',
            }}
          >
            Terim-yig'im muddati
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
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
            Sug‘urta tavakkalchiliklari
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {riskFactors?.map((v: any, idx: number) => {
              return (
                <Grid item xs={6} sm={4} md={6} key={idx}>
                  <InputCheckbox
                    control={form.control}
                    name={v?.key}
                    label={v?.text}
                    sx={{
                      fontFamily: 'GothamProRegular !important',
                      marginLeft: 0,
                    }}
                  />
                </Grid>
              )
            })}
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
            <Grid item xs={6} sm={4} md={4}>
              <Input
                control={form.control}
                name='insurance_liability'
                placeholder='Sug‘urta javobgarlik foizi, %'
                label='Sug‘urta javobgarlik foizi, %'
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
                    onClick={onReject}
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
              }}
              disabled={isDisabled}
            >
              Tasdiqlash
            </Button>
          </Stack>
        </Form>
      )}
    </>
  )
}
