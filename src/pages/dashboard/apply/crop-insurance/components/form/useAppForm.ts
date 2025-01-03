import { rejectApplications } from '@/apis/applications'
import { request } from '@/configs/requests'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useGeoJsonStore } from '@/store/geojson'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useReset } from './useReset'

interface IProps {
  id: string | null | undefined
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAppForm = ({ setOpen, id }: IProps) => {
  const form = useForm()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [rateOpen, setRateOpen] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
  const { setGeoJson } = useGeoJsonStore()
  const { data, isLoading } = useReset({ id, form })
  const isDisabled = data?.status_code === false || data?.status_code === true

  const { mutate } = useMutation({
    mutationFn: async data => await rejectApplications(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS] })
      setOpen(false)
      setIsCanceled(false)
      toast.success('Ariza rad etildi')
    },
    onError: err => {
      console.log(err)
      toast.error('Nimadur xatolik yuz berdi')
    },
  })
  const onReject = () => {
    if (form.watch('comment') === undefined) {
      toast.error('Izoh kiriting!')
    } else {
      const payload: any = { id, comment: form.watch('comment') }
      mutate(payload)
    }
  }

  const { data: riskFactors = [] } = useQuery({
    queryKey: ['config-risk-factors'],
    queryFn: async () => await request('/config/risk-factors'),
    select: res => {
      return res?.data?.risk_factors
    },
  })

  const handleContourNumber = (item: any) => {
    setGeoJson(item)
    if (item?.data) {
      navigate(`/main/apply/crop-insurance/land-areas/${item?.data?.features?.[0]?.properties?.id}`)
    }
  }

  return {
    data,
    form,
    rateOpen,
    onReject,
    isLoading,
    isDisabled,
    isCanceled,
    riskFactors,
    setRateOpen,
    setIsCanceled,
    handleContourNumber,
  }
}
