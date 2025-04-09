import { contractGenerateDoc } from '@/apis/contracts'
import { request } from '@/configs/requests'
import type { DocumentResponse } from '@/types/signed-documents'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface FormValues {
  status_plan: string
  percent: string
  comment: string
}

export const useCreate = () => {
  const { id } = useParams()
  const form = useForm<FormValues>()
  const navigate = useNavigate()
  const location = useLocation()
  const [docs, setDocs] = useState<any[]>([])
  const object = new URLSearchParams(document.location.search)
  const socialParams = Object.fromEntries(object.entries())

  console.log(location.state, 'state')

  const { data: detail = null } = useQuery({
    queryKey: ['CONTRACT-BY-ID', id],
    queryFn: async () => await request(`contract/get/${id}`),
    select: res => res?.data,
    onError: () => {
      toast.error('Nimdur xatolik yuz berdi!')
    },
  })

  const { isLoading } = useQuery({
    queryKey: ['GENERATE-DOC', id],
    queryFn: async () => await contractGenerateDoc(id),
    select: res => res?.data?.link,
    onSuccess: res => {
      setDocs([
        {
          uri: res,
          fileType: 'docx',
          fileName: 'test.docx',
        },
      ])
    },
    onError: () => {
      toast.error('Nimdur xatolik yuz berdi!')
    },
  })

  const { data: signedDocument = null } = useQuery({
    queryKey: ['SIGNED_GET_ONE', location.state?.apply_number],
    queryFn: async () => await request(`application/signed/get/${location.state?.apply_number}`),
    select: res => {
      return res.data
    },
    enabled: location.state?.by_user === 'farmer',
  })

  const { data: signedCompanies = [] } = useQuery({
    queryKey: ['SIGNED_GET_ALL', location.state?.by_user],
    queryFn: async () => await request<DocumentResponse>('application/signed/get/all'),
    select: res => {
      return res.data?.result
    },
    enabled: location.state?.by_user === 'user',
  })

  const { mutate, isLoading: isLoadingAccept } = useMutation({
    mutationFn: async data => await request.post(`/contract/action/${id}`, data),
    onSuccess: () => {
      navigate('/main/contracts/crop-insurance')
      toast.success('Shartnoma holati muvaffaqiyatli o`zgartirildi!')
    },
    onError: () => {
      toast.error('Nimadur xatolik yuz berdi!')
    },
  })

  const onCreate: SubmitHandler<FormValues> = data => {
    const payload: any = {
      action: 'accept',
    }
    mutate(payload)
  }

  const memoizedDocs = useMemo(() => {
    return docs
  }, [docs])

  return {
    form,
    slug: id,
    detail,
    onCreate,
    isLoading,
    memoizedDocs,
    socialParams,
    signedDocument,
    isLoadingAccept,
    signedCompanies,
  }
}
