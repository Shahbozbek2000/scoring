// VariableData.js
import { Grid, Stack, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import BreadcrumpCustom from '@/components/breadcrumb'
import { usePage } from './usePage'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form } from 'react-router-dom'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { TextArea } from '@/components/inputs/input-textarea'
import { Fragment } from 'react'
import { LoadingOverlay } from '@/components/loading-overlay'

const VariableData = () => {
  const {
    form,
    append,
    remove,
    onSubmit,
    isLoading,
    cropsFields,
    riskFactorsFields,
    paymentScheduleFields,
  } = usePage()

  return (
    <Stack>
      <BreadcrumpCustom />
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap='32px'>
          <Stack
            width='100%'
            borderRadius='12px'
            p='32px 24px'
            mx='auto'
            gap='24px'
            bgcolor={theme => theme.palette.allColors.WHITE}
          >
            <Stack>
              <Typography
                sx={{
                  fontFamily: 'GothamProRegular',
                  fontSize: 16,
                  color: 'var(--dark)',
                  margin: '8px 0',
                }}
              >
                Sug'urta
              </Typography>
              <Grid container spacing={{ xs: 2, md: 2 }}>
                <Grid item xs={6} sm={4} md={4}>
                  <Input
                    control={form.control}
                    name='insurance_liability'
                    placeholder='Sug`urta javobgarligi foizi'
                    label='Sug`urta javobgarligi foizi'
                    type='number'
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Input
                    control={form.control}
                    name='deductible_percentage'
                    placeholder='Shartsiz franshiza foizi'
                    label='Sug`urta shartsiz foizi'
                    type='number'
                  />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Input
                    control={form.control}
                    name='insurance_rate_percentage'
                    placeholder='Sug`urta tarifi foizi'
                    label='Sug`urta tarifi foizi'
                    type='number'
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack>
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
              <Grid container spacing={{ xs: 2 }}>
                {riskFactorsFields?.map((v: any, idx: number) => (
                  <Grid item xs={12} sm={12} md={6} key={idx}>
                    <Stack direction='row' alignItems='center' gap={1}>
                      <InputCheckbox
                        control={form.control}
                        name={`risk_factors.${idx}.active`}
                        label=''
                        sx={{
                          fontFamily: 'GothamProRegular !important',
                          marginLeft: 0,
                        }}
                      />
                      <TextArea
                        control={form.control}
                        name={`risk_factors.${idx}.text`}
                        minRows={3}
                        style={{
                          width: '100%',
                          resize: 'vertical',
                          fontFamily: 'GothamProRegular',
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <Stack>
              <Typography
                sx={{
                  fontFamily: 'GothamProRegular',
                  fontSize: 16,
                  color: 'var(--dark)',
                  margin: '8px 0',
                }}
              >
                Ekin turi
              </Typography>
              <Grid container spacing={2}>
                {cropsFields?.map((item: any, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Input
                      control={form.control}
                      name={`crops.${index}.price`}
                      placeholder={item?.crop_name}
                      label={item?.crop_name}
                      type='number'
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <Stack>
              <Typography
                sx={{
                  fontFamily: 'GothamProRegular',
                  fontSize: 16,
                  color: 'var(--dark)',
                  margin: '8px 0',
                }}
              >
                To'lov jadvali
              </Typography>
              <Grid container spacing={2}>
                {paymentScheduleFields.map((item, index) => (
                  <Fragment key={item.id}>
                    <Grid item xs={12} md={6}>
                      <Stack direction='row' spacing={2} alignItems='flex-end'>
                        <Input
                          control={form.control}
                          name={`payment_schedule.${index}.days`}
                          placeholder='Kuni'
                          type='number'
                          label='Kuni'
                        />
                        <Input
                          control={form.control}
                          name={`payment_schedule.${index}.percentage`}
                          placeholder='Foizi'
                          type='number'
                          label='Foizi'
                        />
                        <IconButton
                          onClick={() => {
                            remove(index)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} />
                  </Fragment>
                ))}
                <Grid item xs={12}>
                  <IconButton
                    onClick={() => {
                      append({ days: 0, percentage: 0 })
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Stack>

            <Stack width='100%' display='flex' flexDirection='row' justifyContent='flex-end'>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                sx={{ background: '#08705F', opacity: 0.7, maxWidth: 200 }}
                type='submit'
              >
                O'zgartirish
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Form>
      <LoadingOverlay isLoading={isLoading} />
    </Stack>
  )
}

export default VariableData
