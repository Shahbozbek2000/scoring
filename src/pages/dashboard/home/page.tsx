import { Grid, Stack, Typography } from '@mui/material'
import { pages } from './constants'
import { Card, Left, Right } from './style'

const Home = () => {
  return (
    <Stack>
      <Typography
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        mb='24px'
        fontFamily='GothamProRegular'
      >
        Bosh sahifa
      </Typography>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pages.map(({ id, name, Icon }) => {
          return (
            <Grid item key={id} xs={6} sm={4} md={4}>
              <Card>
                <Left>
                  <Icon />
                </Left>
                <Right>
                  <Typography textAlign='center' fontSize={16} fontFamily='GothamProRegular'>
                    {name}
                  </Typography>
                </Right>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default Home
