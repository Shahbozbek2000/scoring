/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/no-this-alias */
// @ts-nocheck
import { getByIDApplications } from '@/apis/applications'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const usePage = () => {
  const form = useForm()
  const { id } = useParams()
  const [value, setValue] = useState(0)

  const { data: details = null } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_BY_ID_APPLICATIONS + 'new', id],
    queryFn: async () => await getByIDApplications(id),
    select: res => {
      return res?.data
    },
    onSuccess: response => {
      if (response) {
        form.reset({
          farmer_name: response?.farmer_name,
          crop_area: response?.crop_area,
          farmer_stir: response?.farmer_stir,
        })
      }
    },
  })

  return {
    slug: id,
    form,
    value,
    details,
    setValue,
  }
}
