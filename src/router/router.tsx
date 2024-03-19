import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import Layout from '@/layout'
import { createBrowserRouter } from 'react-router-dom'

const Auth = lazy(async () => await import('@/pages/auth'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Home = lazy(async () => await import('@/pages/dashboard/home'))
const Apply = lazy(async () => await import('@/pages/dashboard/apply'))
const Contracts = lazy(async () => await import('@/pages/dashboard/contracts'))
const CoverageInsurance = lazy(
  async () => await import('@/pages/dashboard/contracts/coverage-insurance'),
)
const CreateCoverageInsurance = lazy(
  async () => await import('@/pages/dashboard/contracts/coverage-insurance/create'),
)
const CropInsurance = lazy(async () => await import('@/pages/dashboard/contracts/crop-insurance'))
const PaymentStatus = lazy(async () => await import('@/pages/dashboard/payment-status'))

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
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTER.APPLY,
            element: <Apply />,
          },
          {
            path: ROUTER.CONTRACTS,
            children: [
              {
                index: true,
                element: <Contracts />,
              },
              {
                path: ROUTER.COVERAGE_INSURANCE,
                children: [
                  {
                    index: true,
                    element: <CoverageInsurance />,
                  },
                  {
                    path: ROUTER.CREATE,
                    element: <CreateCoverageInsurance />,
                  },
                ],
              },
              {
                path: ROUTER.CROP_INSURANCE,
                element: <CropInsurance />,
              },
            ],
          },
          {
            path: ROUTER.PAYMENT_STATUS,
            element: <PaymentStatus />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTER.NOT_FOUND,
    element: <NotFound />,
  },
])
