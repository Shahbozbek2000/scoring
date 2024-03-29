import { ReactComponent as Logo } from '@/assets/icons/logo.svg'
import { ROUTER } from '@/constants/router'
import { Container } from '@mui/material'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import { Profile } from './profile'
import { getUser } from '@/utils/user'
import { useEffect, useState } from 'react'

export const Header = () => {
  const users = getUser()
  const [user, setUser] = useState<string | null>(users)

  useEffect(() => {
    const getFromStorage = async () => {
      setUser(users)
    }
    window.addEventListener('storage', getFromStorage)
    void getFromStorage()
  }, [users, user])

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
        <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
          <Link to={ROUTER.HOME}>
            <Logo />
          </Link>
          {user && <Profile />}
        </Stack>
      </Container>
    </Stack>
  )
}
