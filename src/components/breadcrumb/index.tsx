import { location } from '@/constants/location'
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function BreadcrumpCustom() {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').slice(1)

  const breadcrumbs = pathSegments.map((segment, i) => {
    const newPath = location.find(el => el.path === segment)

    if (!newPath) return null

    const isLast = i === pathSegments.length - 1
    const href = `/${pathSegments.slice(0, i + 1).join('/')}`

    return isLast ? (
      <Typography
        key={href}
        color='text.primary'
        variant='subtitle1'
        fontWeight='light'
        fontSize='18px'
        fontFamily='GothamProRegular'
      >
        {newPath.name}
      </Typography>
    ) : (
      <Link
        key={href}
        color='#ABAEB1'
        underline='none'
        href={href}
        variant='subtitle1'
        fontWeight='light'
        fontSize='14px'
        fontFamily='GothamProRegular'
      >
        {newPath.name}
      </Link>
    )
  })

  return (
    <Stack py='20px'>
      <Breadcrumbs separator='>' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  )
}
