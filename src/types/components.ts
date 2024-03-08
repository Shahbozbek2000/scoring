import { type Dayjs } from 'dayjs'
import { type SwitchProps } from '@mui/material/Switch'
import { type MaskedInputProps } from 'react-text-mask'
import { type CheckboxProps } from '@mui/material/Checkbox'
import { type TextFieldProps } from '@mui/material/TextField'
import { type Theme, type SxProps } from '@mui/material/styles'
import { type SelectProps as MuiSelectProps } from '@mui/material/Select'
import { type FormControlLabelProps } from '@mui/material/FormControlLabel'
import { type TimePickerProps, type DateTimePickerProps } from '@mui/x-date-pickers'
import type { Path, Control, FieldValues, UseControllerProps } from 'react-hook-form'
import { type ReactNode, type DetailedHTMLProps, type TextareaHTMLAttributes } from 'react'

export interface OptionProps {
  value: string | number
  label: string | number
  description?: string | null
}

export interface ControlProps<T extends FieldValues> extends UseControllerProps<T> {
  name: Path<T>
  control: Control<T>
}

export type InputProps<T extends FieldValues> = Omit<TextFieldProps, 'variant' | 'id'> &
  ControlProps<T>

export type InputPasswordProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'type' | 'autoComplete' | 'id'
> &
  ControlProps<T>

export type InputMaskProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'autoComplete' | 'variant' | 'id'
> &
  Omit<MaskedInputProps, 'render'> &
  ControlProps<T>

export type InputPhoneProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'autoComplete' | 'variant' | 'id'
> &
  Omit<MaskedInputProps, 'render' | 'mask'> &
  ControlProps<T>

export type InputCheckboxProps<T extends FieldValues> = Exclude<CheckboxProps, 'sx'> &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement' | 'sx' | 'disabled'> &
  ControlProps<T> & {
    error?: boolean
  }

export type InputSwicthProps<T extends FieldValues> = Exclude<SwitchProps, 'sx'> &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement' | 'sx' | 'disabled'> &
  ControlProps<T>

export type InputTimePickerProps<T extends FieldValues> = TimePickerProps<Dayjs> & ControlProps<T>
export type InputDateProps<T extends FieldValues> = DateTimePickerProps<Dayjs> & ControlProps<T>
export type InputTextareaProps<T extends FieldValues> = {
  disabled?: boolean
  sx?: SxProps<Theme>
  labelMinimum?: string
  label?: string | ReactNode
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  ControlProps<T>

export type SelectProps<T extends FieldValues> = Omit<
  MuiSelectProps,
  'value' | 'renderValue' | 'variant' | 'onChange' | 'defaultValue'
> & {
  options: OptionProps[]
  placeholder?: string
  loading?: boolean
} & ControlProps<T>

export type InputSearchProps = Omit<TextFieldProps, 'variant' | 'type' | 'onChange'> & {
  onChange?: (e: string) => void
  variant?: 'outlined' | 'contained'
}

export type UploadImageProps<T extends FieldValues> = ControlProps<T>
export type UploadLogoProps<T extends FieldValues> = ControlProps<T>
export type UploadExcelProps<T extends FieldValues> = ControlProps<T>
