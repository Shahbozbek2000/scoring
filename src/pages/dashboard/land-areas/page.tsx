import { Stack } from '@mui/material'
import BreadcrumpCustom from '@/components/breadcrumb'
import { CustomTabs } from './components/tabs'

const LandAreas = () => {
  return (
    <Stack>
      <BreadcrumpCustom />
      <Stack
        width='100%'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <CustomTabs />
      </Stack>
    </Stack>
  )
}

export default LandAreas
