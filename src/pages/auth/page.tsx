import { Button, TextField, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { ReactComponent as Logogreeen } from '@/assets/icons/logo-green.svg'
import { Form, useNavigate } from 'react-router-dom'
import { ROUTER } from '@/constants/router'

const Auth = () => {
  const navigate = useNavigate()
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    navigate(ROUTER.HOME)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack
        width='832px'
        borderRadius='12px'
        p='32px 24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <Typography
          variant='subtitle1'
          textAlign='center'
          fontWeight='bold'
          fontSize='24px'
          mb='24px'
        >
          Hisobga kiring
        </Typography>

        <Stack width='100%' gap='24px' direction='row' alignItems='center'>
          <Stack gap='24px' width='50%'>
            <TextField label='Email' type='email' name='user' />
            <TextField label='Password' name='pass' type='password' />
            <Button type='submit'>Tizimga kirish</Button>
          </Stack>
          <Stack
            width='50%'
            sx={{
              svg: {
                width: '100%',
                height: '120px',
              },
            }}
          >
            <Logogreeen />
          </Stack>
        </Stack>
      </Stack>
    </Form>
  )
}
export default Auth
