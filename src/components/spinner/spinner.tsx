import Box from '@mui/material/Box'
import CircularProgress, { type CircularProgressProps } from '@mui/material/CircularProgress'

export interface PropTypes extends CircularProgressProps {
  center?: boolean
}

export const Spinner = ({ center, ...rest }: PropTypes) => (
  <Box
    sx={
      center
        ? {
            width: '100%',
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...rest.sx,
          }
        : rest.sx
    }
  >
    <CircularProgress {...rest} />
  </Box>
)
