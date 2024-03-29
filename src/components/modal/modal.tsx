import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { type IModal } from '@/types/modal'

export const CustomModal = ({
  open,
  setOpen,
  title,
  children,
  maxWidth = 'lg',
  fullScreen: fullscreen = true,
}: IModal) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      fullScreen={!fullscreen ? false : fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle
        id='responsive-dialog-title'
        sx={{ fontFamily: 'GothamProRegular', fontSize: 16, color: 'var(--dark)' }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
