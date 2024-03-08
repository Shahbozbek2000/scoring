import { ReactComponent as Logo } from '@/assets/icons/logo.svg'
import { Container } from '@mui/material'
import Stack from '@mui/material/Stack'

export const Header = () => {
  return (
    <Stack
      width='100%'
      direction='row'
      alignItems='center'
      gap='16px'
      p='16px 20px'
      flexWrap='wrap'
      bgcolor={theme => theme.palette.allColors.BRAND}
      borderBottom={theme => `1px solid ${theme.palette.allColors.GREY20}`}
    >
      <Container>
        <Logo />
      </Container>
    </Stack>
  )
}
