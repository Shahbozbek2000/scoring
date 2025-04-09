import { Container, Stack, Typography } from '@mui/material'
import { ReactComponent as Logo } from '@/assets/icons/itrain.svg'
import { ReactComponent as Logogreeen } from '@/assets/icons/logo-green.svg'
import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'

export const Foooter = () => {
  const currentYear = new Date().getFullYear()

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
              <Typography
                fontSize='14px'
                color={theme => theme.palette.allColors.GREY10}
                fontFamily='GothamProRegular'
              >
                Agrosanoat sohasida sug'urtalashni avtomatlashtirilgan tizimi
              </Typography>
            </Stack>
            {/* <Stack gap='4px'>
              <Typography
                color={theme => theme.palette.allColors.BLACK}
                fontFamily='GothamProRegular'
              >
                Sahifalar
              </Typography>
              <Typography
                color={theme => theme.palette.allColors.GREY10}
                component='span'
                fontFamily='GothamProRegular'
              >
                Yer maydonlari
              </Typography>
              <Typography
                color={theme => theme.palette.allColors.GREY10}
                component='span'
                fontFamily='GothamProRegular'
              >
                Ekin joylash
              </Typography>
              <Typography
                color={theme => theme.palette.allColors.GREY10}
                component='span'
                fontFamily='GothamProRegular'
              >
                Moliyalashtirish
              </Typography>
            </Stack> */}
            {/* <Stack gap='4px'>
              <Typography
                color={theme => theme.palette.allColors.GREY10}
                fontFamily='GothamProRegular'
              >
                Shartnomalar
              </Typography>
              <Typography
                color={theme => theme.palette.allColors.GREY10}
                component='span'
                fontFamily='GothamProRegular'
              >
                Agrotexnik tadbirlar
              </Typography>
            </Stack> */}
            <Stack gap='4px'>
              <Typography
                fontFamily='GothamProRegular'
                color={theme => theme.palette.allColors.BLACK}
              >
                Aloqa
              </Typography>
              <Typography
                component={Link}
                to='tel:+998712051155'
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none' }}
                fontFamily='GothamProRegular'
              >
                <Typography
                  color={theme => theme.palette.allColors.GREY10}
                  component='span'
                  fontFamily='GothamProRegular'
                >
                  Tel:
                </Typography>{' '}
                +998 71 205 11 55 / 1251 (du-ju soat 9:00 dan 18:00 gacha)
              </Typography>
              <Typography
                component={Link}
                to='tel:+998971441251'
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none' }}
                fontFamily='GothamProRegular'
              >
                <Typography
                  color={theme => theme.palette.allColors.GREY10}
                  component='span'
                  fontFamily='GothamProRegular'
                >
                  Tel2:
                </Typography>{' '}
                +998 97 144 12 51 / (24/7)
              </Typography>
              <Typography
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none', maxWidth: 370 }}
                fontFamily='GothamProRegular'
              >
                <Typography
                  color={theme => theme.palette.allColors.GREY10}
                  component='span'
                  fontFamily='GothamProRegular'
                >
                  Manzil:
                </Typography>{' '}
                Toshkent shahri, Yashnobod tumani, ko'ch. Sodiq Azimov, 50. 3-qavat.
              </Typography>
              <Typography
                component={Link}
                to='tel:+998996314221'
                color={theme => theme.palette.allColors.BLACK}
                sx={{ textDecoration: 'none' }}
                fontFamily='GothamProRegular'
              >
                <Typography
                  color={theme => theme.palette.allColors.GREY10}
                  component='span'
                  fontFamily='GothamProRegular'
                >
                  Email:
                </Typography>{' '}
                info@semurgins.uz
              </Typography>
              <Stack direction='row' spacing={2}>
                <Typography
                  component={Link}
                  to='https://www.instagram.com/semurgins'
                  color={theme => theme.palette.allColors.BLACK}
                  sx={{ textDecoration: 'none' }}
                  fontFamily='GothamProRegular'
                  target='_blank'
                >
                  <InstagramIcon />
                </Typography>
                <Typography
                  component={Link}
                  to='https://www.facebook.com/semurginsurance'
                  color={theme => theme.palette.allColors.BLACK}
                  sx={{ textDecoration: 'none' }}
                  fontFamily='GothamProRegular'
                  target='_blank'
                >
                  <FacebookIcon />
                </Typography>
                <Typography
                  component={Link}
                  to='https://t.me/semurgins'
                  color={theme => theme.palette.allColors.BLACK}
                  sx={{ textDecoration: 'none' }}
                  fontFamily='GothamProRegular'
                  target='_blank'
                >
                  <TelegramIcon />
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Stack width='100%' py='20px' bgcolor={theme => theme.palette.allColors.BRAND}>
        <Container>
          <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
            <Typography
              variant='subtitle1'
              color={theme => theme.palette.allColors.WHITE}
              fontFamily='GothamProRegular'
            >
              {currentYear}; Agrosanoat sohasida sug'urtalashni avtomatlashtirilgan tizimi
            </Typography>
            <Logo />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  )
}
