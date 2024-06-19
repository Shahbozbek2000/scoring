/* eslint-disable @tanstack/query/exhaustive-deps */
import { Button, Grid, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { PaperWrapper } from './style'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { contractGenerateDoc } from '@/apis/contracts'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { useState, useMemo } from 'react'
import { LoadingOverlay } from '@/components/loading-overlay'
import toast from 'react-hot-toast'
import { request } from '@/configs/requests'
import BreadcrumpCustom from '@/components/breadcrumb'

interface FormValues {
  status_plan: string
  percent: string
  comment: string
}

const CreateCropInsurance = () => {
  const { id } = useParams()
  const form = useForm<FormValues>()
  const navigate = useNavigate()
  const [docs, setDocs] = useState<any[]>([])
  const object = new URLSearchParams(document.location.search)
  const socialParams = Object.fromEntries(object.entries())

  const { isLoading } = useQuery({
    queryKey: ['GENERATE-DOC'],
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

  const { mutate, isLoading: isLoadingAccept } = useMutation({
    mutationFn: async data => await request.post(`/contract/action/${id}`, data),
    onSuccess: res => {
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

  return (
    <Stack>
      <BreadcrumpCustom />
      <Stack
        width='100%'
        borderRadius='16px'
        p='24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <Form onSubmit={form.handleSubmit(onCreate)}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <PaperWrapper>
                <DocViewer
                  documents={memoizedDocs}
                  pluginRenderers={DocViewerRenderers}
                  style={{ height: 750 }}
                  config={{
                    header: {
                      disableHeader: true,
                    },
                  }}
                />
              </PaperWrapper>
            </Grid>
          </Grid>
          {socialParams?.status === 'created' ? (
            <Stack direction='row' width='100%' padding='24px 0' justifyContent='flex-start'>
              <Button sx={{ backgroundColor: '#08705F' }} type='submit'>
                Tasdiqlash
              </Button>
            </Stack>
          ) : (
            <Stack
              direction='row'
              width='100%'
              padding='24px 0'
              justifyContent='flex-start'
              gap='16px'
            >
              <a href={memoizedDocs?.[0]?.uri} download={true} target='_blank' rel='noreferrer'>
                <Button
                  variant='outlined'
                  sx={{ color: '#08705F', border: '1px solid #08705F !important', opacity: 0.7 }}
                >
                  Yuklab olish
                </Button>
              </a>
            </Stack>
          )}
        </Form>
        <LoadingOverlay isLoading={isLoading || isLoadingAccept} />
      </Stack>
    </Stack>
  )
}

export default CreateCropInsurance
