import { Input } from '../input'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import { type FieldValues } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import { type InputPasswordProps } from '@/types/components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export const InputPassword = <T extends FieldValues>(props: InputPasswordProps<T>) => {
  const { value, toggle } = useBoolean()

  return (
    <Input
      {...props}
      autoComplete='current-password'
      type={value ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={toggle}>
              {value ? (
                <RemoveRedEyeIcon sx={{ width: 20, height: 20 }} />
              ) : (
                <VisibilityOffIcon sx={{ width: 20, height: 20 }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  )
}
