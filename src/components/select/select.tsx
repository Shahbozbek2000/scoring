// @ts-nocheck
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { useController, type FieldValues } from 'react-hook-form'
import { type InputProps } from '@/types/components'
import { COLORS } from '@/constants/css'

export const SelectInput = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  ...props
}: InputProps<T> & { options: Array<{ label: string; value: string | number }> }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <FormControl fullWidth size='small' error={invalid}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...props}
        {...inputProps}
        id={name}
        labelId={`${name}-label`}
        value={value ?? ''}
        inputRef={ref}
        onChange={e => {
          onChange(e)
          if (props.onChange) {
            props.onChange(e)
          }
        }}
        placeholder='Select'
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '10px',
              marginTop: '8px',
              boxShadow: 'none',
              border: `1px solid ${COLORS.GREY}`,
              fontFamily: 'GothamProRegular',
            },
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error?.message && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}
