import { Button, IconButton, Stack } from '@mui/material'
import { ReactComponent as IconCheck } from '@/assets/icons/check.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { ReactComponent as IconEyes } from '@/assets/icons/eyes.svg'

interface ICheckStatus {
  id: string | number
  status_code: boolean | null
  accept: (id: string | number) => void
  reject: (id: string | number) => void
  handleOpen: <T>(info: T) => void
  info: any
}

export const CheckStatus = ({
  id,
  status_code,
  accept,
  reject,
  handleOpen,
  info,
}: ICheckStatus) => {
  switch (status_code) {
    case null:
      return (
        <Stack direction='row' spacing={2}>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(8, 112, 95, 0.20)',
            }}
            onClick={() => {
              accept(id)
            }}
          >
            <IconCheck />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(235, 87, 87, 0.20)',
            }}
            onClick={() => {
              reject(id)
            }}
          >
            <IconClose />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '4px !important',
              backgroundColor: 'rgba(62, 91, 116, 0.20)',
            }}
            onClick={() => {
              handleOpen(info)
            }}
          >
            <IconEyes />
          </IconButton>
        </Stack>
      )
    default:
      return (
        <Button
          variant='outlined'
          onClick={() => {
            handleOpen(info)
          }}
          sx={{
            color: '#60676D',
            borderRadius: '4px',
            border: '1px solid #E7E7E7',
            width: 115,
            height: 32,
          }}
        >
          Ko'rish
        </Button>
      )
  }
}
