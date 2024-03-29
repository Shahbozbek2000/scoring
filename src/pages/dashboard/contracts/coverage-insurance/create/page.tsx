import { Button, Grid, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { PaperWrapper } from './style'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { acceptContract, contractGenerateDoc } from '@/apis/contracts'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { useState } from 'react'
import { LoadingOverlay } from '@/components/loading-overlay'
import toast from 'react-hot-toast'

interface FormValues {
  status_plan: string
  percent: string
}

const CreateCoverageInsurance = () => {
  const { id } = useParams()
  const form = useForm<FormValues>()
  const navigate = useNavigate()
  const [docs, setDocs] = useState<any[]>([])

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

  const { mutate, isLoading: isLoadingAccept } = useMutation({
    mutationFn: async () => await acceptContract(id),
    onSuccess: res => {
      navigate('/main/contracts/coverage-insurance')
      toast.success('Shartnoma tasdiqlandi')
    },
    onError: () => {
      toast.error('Nimdur xatolik yuz berdi!')
    },
  })
  const onCreate: SubmitHandler<FormValues> = data => {
    console.log(data)
    mutate()
  }

  return (
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
                documents={docs}
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
        <Stack direction='row' width='100%' padding='24px 0' justifyContent='flex-end'>
          <Button sx={{ backgroundColor: '#08705F' }} type='submit'>
            Tasdiqlash
          </Button>
        </Stack>
      </Form>
      <LoadingOverlay isLoading={isLoading || isLoadingAccept} />
    </Stack>
  )
}

export default CreateCoverageInsurance
