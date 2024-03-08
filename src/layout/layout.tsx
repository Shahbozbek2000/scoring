import { Hoc } from './hoc'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '@/pages/500/page'
import { Suspense } from '@/components/suspense'
import { Header } from '@/components/header'
import { Container, Stack } from '@mui/material'
import { Foooter } from '@/components/footer'

const Layout = () => (
  <ErrorBoundary>
    <Hoc>
      <Header />
      <Stack
        pt='32px'
        pb='48px'
        component='main'
        minHeight='calc(100vh - 390px)'
        sx={{ backgroundColor: theme => theme.palette.allColors.GREY }}
      >
        <Container>
          <Suspense>
            <Outlet />
          </Suspense>
        </Container>
      </Stack>
      <Foooter />
    </Hoc>
  </ErrorBoundary>
)

export default Layout
