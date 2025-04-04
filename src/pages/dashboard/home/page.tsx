import { Grid, Stack, Typography } from '@mui/material'
import { pages } from './constants'
import { Card, Left, Right } from './style'
import { useNavigate } from 'react-router-dom'
import BreadcrumpCustom from '@/components/breadcrumb'
import { getUser } from '@/utils/user'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  [key: string]: any
}

const Home = () => {
  const user: any = getUser()
  const navigate = useNavigate()
  const decoded: DecodedToken = jwtDecode(user)

  return (
    <Stack>
      <BreadcrumpCustom />
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pages
          ?.filter(({ permissions }) => permissions?.includes(decoded?.role))
          ?.map(({ id, name, Icon, link, show }) => {
            return (
              <Grid item key={id} xs={6} sm={4} md={4}>
                <Card
                  onClick={() => {
                    navigate(link)
                  }}
                >
                  <Left>
                    <Icon />
                  </Left>
                  <Right>
                    <Typography textAlign='center' fontSize={16} fontFamily='GothamProRegular'>
                      {name}
                    </Typography>
                  </Right>
                  {!show && (
                    <div className='show'>
                      <span>Jarayonda</span>
                    </div>
                  )}
                </Card>
              </Grid>
            )
          })}
      </Grid>
    </Stack>
  )
}

export default Home
