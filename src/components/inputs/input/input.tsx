import TextField from '@mui/material/TextField'
import { type InputProps } from '@/types/components'
import { type FieldValues, useController } from 'react-hook-form'

export const Input = <T extends FieldValues>({ label, name, control, ...props }: InputProps<T>) => {
  const {
    field: { ref, disabled, onChange, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <TextField
      {...props}
      {...inputProps}
      id={name}
      label={label}
      error={invalid}
      size='small'
      variant='outlined'
      fullWidth
      aria-readonly
      helperText={error?.message}
      value={inputProps?.value ?? ''}
      inputRef={props.inputRef ?? ref}
      InputLabelProps={{ shrink: true }}
      onChange={e => {
        onChange(e)
        if (props.onChange) {
          props.onChange(e)
        }
      }}
    />
  )
}
