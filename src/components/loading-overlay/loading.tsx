import { Backdrop, CircularProgress } from '@mui/material'

interface ILoadingOverlay {
  isLoading: boolean
}

export const LoadingOverlay = ({ isLoading }: ILoadingOverlay) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
