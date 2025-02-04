import { Button, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { ReactComponent as Logogreeen } from '@/assets/icons/logo-green.svg'
import { Form, Navigate } from 'react-router-dom'
import { Input } from '@/components/inputs/input'
import { InputPassword } from '@/components/inputs/input-password'
import { useLogin } from './useLogin'
import { LoadingOverlay } from '@/components/loading-overlay'
import { ROUTER } from '@/constants/router'

const Auth = () => {
  const user = localStorage.getItem('token')
  const { form, onLogin, isLoading } = useLogin()

  if (user) {
    return <Navigate to={ROUTER.HOME} />
  }

  return (
    <Form onSubmit={form.handleSubmit(onLogin)}>
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
          Tizimga kiring
        </Typography>

        <Stack width='100%' gap='24px' direction='row' alignItems='center'>
          <Stack gap='24px' width='50%'>
            <Input
              control={form.control}
              name='login'
              placeholder='Email (login)*'
              label='Email (login)*'
            />
            <InputPassword
              control={form.control}
              name='password'
              placeholder='Parol*'
              label='Parol*'
            />
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
      <LoadingOverlay isLoading={isLoading} />
    </Form>
  )
}
export default Auth
