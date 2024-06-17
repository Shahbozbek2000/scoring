// @ts-nocheck
import { Controller } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField } from '@mui/material'

export const InputDate = ({ name, control }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DesktopDatePicker
            {...field}
            renderInput={(params: any) => (
              <TextField
                {...params}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff !important',
                    borderRadius: '8px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#08705F !important',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#08705F !important',
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#08705F !important',
                  },
                  fontSize: 14,
                }}
                placeholder='Select'
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}
