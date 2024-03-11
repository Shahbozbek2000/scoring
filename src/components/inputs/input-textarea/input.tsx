import TextField from '@mui/material/TextField'
import { type InputProps } from '@/types/components'
import { type FieldValues, useController } from 'react-hook-form'

export const TextArea = <T extends FieldValues>({
  label,
  name,
  control,
  ...props
}: InputProps<T>) => {
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
      fullWidth
      helperText={error?.message}
      value={inputProps?.value ?? ''}
      inputRef={props.inputRef ?? ref}
      InputLabelProps={{
        shrink: true,
        style: { color: '#EB5757', fontFamily: 'GothamProRegular' },
      }}
      multiline
      minRows={4}
      maxRows={16}
      sx={{
        '& .MuiInputBase-sizeSmall': {
          height: 'auto !important',
        },
        fontFamily: 'GothamProRegular !important',
      }}
      onChange={e => {
        onChange(e)
        if (props.onChange) {
          props.onChange(e)
        }
      }}
    />
  )
}
