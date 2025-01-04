import { Stack } from '@mui/material'
import { CustomTabs } from './components/tabs'
import { usePage } from './usePage'
import { FormProvider } from 'react-hook-form'

const FormContract = () => {
  const { slug, form, value, setValue } = usePage()

  return (
    <Stack>
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
            <CustomTabs slug={slug} value={value} setValue={setValue} />
          </FormProvider>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FormContract
