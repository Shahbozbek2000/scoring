import { Button, Stack } from '@mui/material'

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
            Belgilash
          </Button>
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
