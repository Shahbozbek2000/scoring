import { Stack, Typography } from '@mui/material'
import { CustomTabs } from './components/tabs'
import { usePage } from './usePage'
import { FormProvider } from 'react-hook-form'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useNavigate } from 'react-router-dom'

const FormContract = () => {
  const navigate = useNavigate()
  const { slug, form, value, details, setValue } = usePage()

  return (
    <Stack gap='16px'>
      <Stack
        direction='row'
        alignItems='center'
        gap='8px'
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(-1)
        }}
      >
        <ChevronLeftIcon />
        <Typography fontFamily='GothamProMedium'>Ortga qaytish</Typography>
      </Stack>
      <Stack gap='24px'>
        <Stack
          width='100%'
          borderRadius='12px'
          p='32px 24px'
          mx='auto'
          gap='24px'
          bgcolor={theme => theme.palette.allColors.WHITE}
        >
          <FormProvider {...form}>
            <CustomTabs
              slug={slug}
              value={value}
              details={details}
              pointerData={details?.credit_area_contour_numbers}
              setValue={setValue}
            />
          </FormProvider>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FormContract
