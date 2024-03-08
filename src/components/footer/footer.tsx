import { Container, Stack, Typography } from '@mui/material'
import { ReactComponent as Logo } from '@/assets/icons/itrain.svg'
import { ReactComponent as Logogreeen } from '@/assets/icons/logo-green.svg'
import { Link } from 'react-router-dom'

export const Foooter = () => {
  return (
    <Stack width='100%'>
      <Stack width='100%' py='48px' bgcolor={theme => theme.palette.allColors.WHITE}>
        <Container>
          <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
            <Stack
              gap='24px'
              width='300px'
              sx={{
                svg: {
                  width: '130px',
                },
              }}
            >
              <Logogreeen />
              <Typography fontSize='18px' color={theme => theme.palette.allColors.GREY10}>
                Agrosanoat sohasida sug'urtalashni avtomatlashtirilgan tizimi
              </Typography>
            </Stack>

            <Stack gap='4px'>
              <Typography color={theme => theme.palette.allColors.BLACK}>Aloqa</Typography>
              <Typography
                component={Link}
                to='tel:+998902339809'
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none' }}
              >
                <Typography color={theme => theme.palette.allColors.GREY10} component='span'>
                  Tel:
                </Typography>{' '}
                +998902339809
              </Typography>
              <Typography
                component={Link}
                to='tel:+998902339809'
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none' }}
              >
                <Typography color={theme => theme.palette.allColors.GREY10} component='span'>
                  Email:
                </Typography>{' '}
                azamov980@gmail.com
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Stack width='100%' py='20px' bgcolor={theme => theme.palette.allColors.BRAND}>
        <Container>
          <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
            <Typography variant='subtitle1' color={theme => theme.palette.allColors.WHITE}>
              © 2024; Agrosanoat sohasida sug'urtalashni avtomatlashtirilgan tizimi
            </Typography>
            <Logo />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  )
}
