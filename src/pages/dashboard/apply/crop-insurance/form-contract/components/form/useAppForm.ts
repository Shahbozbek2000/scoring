import { useState } from 'react'
import { acceptApplications, rejectApplications } from '@/apis/applications'
import { request } from '@/configs/requests'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useGeoJsonStore } from '@/store/geojson'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useReset } from './useReset'

interface IAppFormProps {
  slug: string | undefined
}

export const useAppForm = ({ slug }: IAppFormProps) => {
  const { id } = useParams()
  const form = useFormContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [rateOpen, setRateOpen] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
  const { setGeoJson } = useGeoJsonStore()
  const { data, isLoading } = useReset({ id: slug, form })
  const isDisabled = data?.status_code === false || data?.status_code === true

  const { mutate } = useMutation({
    mutationFn: async data => await rejectApplications(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GET_ALL_APPLICATIONS] })
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
      const payload: any = { id: slug, comment: form.watch('comment') }
      mutate(payload)
    }
  }

  const { data: riskFactors = [] } = useQuery({
    queryKey: ['config-risk-factors'],
    queryFn: async () => await request('/config'),
    select: res => {
      return res?.data?.risk_factors
    },
  })

  const { mutate: acceptMutate } = useMutation({
    mutationFn: async (data: string | undefined) => await acceptApplications(data),
    onSuccess: res => {
      navigate(`/main/contracts/crop-insurance/create/${res?.data?.contract_id}?status=created`, {
        state: {
          by_user: data?.by_user ? 'user' : 'farmer',
          apply_number: data?.number,
        },
      })
      toast.success('Ariza qabul qilindi')
    },
  })

  const accept = () => {
    acceptMutate(id)
  }

  const handleContourNumber = (item: any) => {
    setGeoJson(item)
    if (item?.data) {
      navigate(`/main/apply/crop-insurance/land-areas/${item?.data?.features?.[0]?.properties?.id}`)
    }
  }

  return {
    data,
    form,
    accept,
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
