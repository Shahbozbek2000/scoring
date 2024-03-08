import { ROUTER } from '@/constants/router'
import Layout from '@/layout'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(async () => await import('@/pages/home'))
const NotFound = lazy(async () => await import('@/pages/404'))
// const Drow = lazy(async () => await import('@/pages/drow'))
// const Users = lazy(async () => await import('@/pages/users'))

export const router = createBrowserRouter([
  {
    path: ROUTER.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: ROUTER.MAP,
      //   element: <Drow />,
      // },
      // {
      //   path: ROUTER.USERS,
      //   element: <Users />,
      // },
    ],
  },

  {
    path: ROUTER.NOT_FOUND,
    element: <NotFound />,
  },
])
