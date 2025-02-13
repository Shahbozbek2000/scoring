import { Fragment, useState } from 'react'
import { Avatar, Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import IconUser from '@/assets/icons/user.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import { COLORS } from '@/constants/css'
import { ROUTER } from '@/constants/router'
import { jwtDecode } from 'jwt-decode'

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const token: string | null = localStorage.getItem('token')
  const user: any = token ? jwtDecode(token) : null
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    localStorage.clear()
    window.location.href = ROUTER.AUTH
  }

  return (
    <Fragment>
      <Button sx={{ backgroundColor: 'transparent !important' }} onClick={handleClick}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Avatar alt='Remy Sharp' src={IconUser} />
          <Typography
            sx={{
              fontFamily: 'GothamProRegular',
              fontSize: 16,
              color: '#fff',
              textTransform: 'capitalize',
            }}
          >
            {user?.login}
          </Typography>
        </Stack>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout} sx={{ color: COLORS.RED10 }}>
          <LogoutIcon color='error' /> Tizimdan chiqish
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
