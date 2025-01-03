import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const usePage = () => {
  const form = useForm()
  const { id } = useParams()
  const [value, setValue] = useState(0)

  return {
    slug: id,
    form,
    value,
    setValue,
  }
}
