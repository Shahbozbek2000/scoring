import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { router } from './router'
import { queryClient } from './configs/react-query'
import { theme } from './configs/material'
import { Suspense } from './components/suspense'
import { Toaster } from 'react-hot-toast'
import 'leaflet/dist/leaflet.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Toaster position='top-right' reverseOrder={false} />
      </CssVarsProvider>
    </QueryClientProvider>
  </Suspense>,
)
