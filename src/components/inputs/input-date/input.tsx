import dayjs from 'dayjs'
import { type InputDateProps } from '@/types/components'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { type Path, Controller, type FieldValues } from 'react-hook-form'
import { ReactComponent as IconCalendar } from '@/assets/icons/calendar.svg'

export const InputDate = <T extends FieldValues>({
  name,
  control,
  ...props
}: InputDateProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null as Path<null>}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <DateTimePicker
            {...props}
            value={dayjs(field.value)}
            onChange={(e, context) => {
              field.onChange(e)
              if (props.onChange) {
                props.onChange(dayjs(e), context)
              }
            }}
            sx={{
              width: '100%',
            }}
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
              openPickerIcon: IconCalendar,
            }}
          />
        )
      }}
    />
  )
}
