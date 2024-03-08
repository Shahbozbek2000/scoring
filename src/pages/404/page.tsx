import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ReactComponent as Icon404Light } from '@/assets/icons/404-light.svg'
import { Link } from 'react-router-dom'
import { ROUTER } from '@/constants/router'

const Page = () => {
  return (
    <Stack
      p='20px'
      height='100vh'
      direction='column'
      width='100vw'
      alignItems='center'
      justifyContent='center'
    >
      <Stack
        mb='60px'
        sx={{
          svg: {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Icon404Light />
      </Stack>
      <Typography component='h2'>Page Not Found</Typography>
      <Typography align='center' p='12px 0 30px' maxWidth='418px'>
        Oops, something went wrong. We couldn’t find the page you are looking for
      </Typography>
      <Button
        sx={theme => ({ color: theme.palette.allColors.WHITE + ' !important' })}
        LinkComponent={Link}
        href={ROUTER.AUTH}
        variant='contained'
      >
        Back to home
      </Button>
    </Stack>
  )
}

export default Page
