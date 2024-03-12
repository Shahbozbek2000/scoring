import { Stack, Typography } from '@mui/material'

export const Empty = () => {
  return (
    <Stack width='100%' direction='row' justifyContent='center'>
      <Typography
        sx={{
          fontFamily: 'GothamProRegular',
          fontSize: 16,
        }}
      >
        Ma'lumot mavjud emas!
      </Typography>
    </Stack>
  )
}
