import { useRef, useEffect } from 'react'
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'

interface HTMLButtonElementProps extends HTMLButtonElement {
  indeterminate: boolean
}

export const InputCheckboxIndeterminate = ({
  indeterminate,
  className = '',
  ...rest
}: CheckboxProps) => {
  const ref = useRef<HTMLButtonElementProps>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (ref.current) ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return <Checkbox ref={ref} {...rest} />
}
