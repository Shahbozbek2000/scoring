// @ts-nocheck
import MaskedInput from 'react-text-mask'
import TextField from '@mui/material/TextField'
import { type InputMaskProps } from '@/types/components'
import { useController, type FieldValues } from 'react-hook-form'

export const InputMask = <T extends FieldValues>({
  name,
  mask,
  pipe,
  guide,
  control,
  showMask,
  placeholderChar,
  keepCharPositions,
  ...rest
}: InputMaskProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  return (
    <MaskedInput
      {...field}
      pipe={pipe}
      mask={mask}
      guide={guide}
      showMask={showMask}
      placeholderChar={placeholderChar}
      keepCharPositions={keepCharPositions}
      render={(ref, props) => {
        return (
          <TextField
            {...rest}
            {...props}
            error={invalid}
            inputRef={props.inputRef ?? ref}
            variant='outlined'
            autoComplete='off'
            size='small'
            helperText={error?.message}
            InputLabelProps={{ shrink: true }}
            onChange={e => {
              props.onChange(e)
              if (rest?.onChange) rest?.onChange(e)
            }}
          />
        )
      }}
    />
  )
}
