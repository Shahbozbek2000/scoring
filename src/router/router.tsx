import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import Layout from '@/layout'
import { createBrowserRouter } from 'react-router-dom'

const Auth = lazy(async () => await import('@/pages/auth'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('@/pages/dashboard/home'))

export const router = createBrowserRouter([
  {
    path: ROUTER.AUTH,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: ROUTER.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: ROUTER.NOT_FOUND,
    element: <NotFound />,
  },
])
