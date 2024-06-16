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
const PaymentStatus = lazy(async () => await import('@/pages/dashboard/payment-status'))
const Documents = lazy(async () => await import('@/pages/dashboard/documents'))
const Polis = lazy(async () => await import('@/pages/dashboard/documents/polis'))
const TechnicalSupport = lazy(async () => await import('@/pages/dashboard/technical-support'))
const ApplyCropInsurance = lazy(async () => await import('@/pages/dashboard/apply/crop-insurance'))
const ApplyCoverageInsurance = lazy(
  async () => await import('@/pages/dashboard/apply/coverage-insurance'),
)
const ContractCropInsurance = lazy(
  async () => await import('@/pages/dashboard/contracts/crop-insurance'),
)
const CreateCropInsurance = lazy(
  async () => await import('@/pages/dashboard/contracts/crop-insurance/create'),
)

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
            children: [
              {
                index: true,
                element: <Apply />,
              },
              {
                path: ROUTER.CROP_INSURANCE,
                element: <ApplyCropInsurance />,
              },
              {
                path: ROUTER.COVERAGE_INSURANCE,
                element: <ApplyCoverageInsurance />,
              },
            ],
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
                    path: `${ROUTER.CREATE}/:id`,
                    element: <CreateCoverageInsurance />,
                  },
                ],
              },
              {
                path: ROUTER.CROP_INSURANCE,
                children: [
                  {
                    index: true,
                    element: <ContractCropInsurance />,
                  },
                  {
                    path: `${ROUTER.CREATE}/:id`,
                    element: <CreateCropInsurance />,
                  },
                ],
              },
            ],
          },
          {
            path: ROUTER.PAYMENT_STATUS,
            element: <PaymentStatus />,
          },
          {
            path: ROUTER.DOCUMENTS,
            children: [
              {
                index: true,
                element: <Documents />,
              },
              {
                path: ROUTER.POLIS,
                element: <Polis />,
              },
            ],
          },
          {
            path: ROUTER.TECHNICAL_SUPPORT,
            element: <TechnicalSupport />,
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
