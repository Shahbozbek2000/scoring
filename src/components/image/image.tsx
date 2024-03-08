import { Conatiner } from './style'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import { type Theme, type SxProps } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ImageProps {
  alt: string
  src: string
  radius?: number | string
  sx?: SxProps<Theme> | undefined
}

export const Image = ({ sx, alt, src, radius }: ImageProps) => {
  const { value, setFalse } = useBoolean(true)

  return (
    <Conatiner sx={sx} radius={radius}>
      {value && (
        <Box className='loading'>
          <Skeleton
            width='100%'
            height='100%'
            variant='rectangular'
            sx={{ borderRadius: radius }}
          />
        </Box>
      )}
      <LazyLoadImage
        alt={alt}
        width='100%'
        effect='blur'
        height='100%'
        src={src}
        afterLoad={setFalse}
        onError={({ currentTarget }) => {
          setFalse()
          currentTarget.onerror = null
          currentTarget.src = '/default-image.webp'
        }}
      />
    </Conatiner>
  )
}
