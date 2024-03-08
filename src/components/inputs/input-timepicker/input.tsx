import dayjs from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { type InputTimePickerProps } from '@/types/components'
import { Controller, type Path, type FieldValues } from 'react-hook-form'
import { ReactComponent as IconClockCircle } from '@/assets/icons/clock-circle.svg'

export const InputTimePicker = <T extends FieldValues>({
  name,
  control,
  ...props
}: InputTimePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null as Path<null>}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <TimePicker
            {...props}
            value={dayjs(field.value)}
            onChange={(e, context) => {
              field.onChange(e)
              if (props.onChange) {
                props.onChange(dayjs(e), context)
              }
            }}
            ampm={false}
            sx={{ width: '100%' }}
            slotProps={{
              inputAdornment: {
                position: 'start',
              },
              textField: {
                error: invalid,
                helperText: error?.message,
              },
            }}
            slots={{
              openPickerIcon: IconClockCircle,
            }}
          />
        )
      }}
    />
  )
}
