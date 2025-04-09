/* eslint-disable @tanstack/query/exhaustive-deps */
import { Button, Grid, Stack, Typography } from '@mui/material'
import { Card, PaperWrapper, SignedCompanies } from './style'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { LoadingOverlay } from '@/components/loading-overlay'
import { useCreate } from './useCreate'
import { getStatus2 } from '@/utils/status'
import { COLORS } from '@/constants/css'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const CreateCropInsurance = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    form,
    detail,
    onCreate,
    isLoading,
    memoizedDocs,
    socialParams,
    signedDocument,
    isLoadingAccept,
    signedCompanies,
  } = useCreate()

  console.log(location.state)

  return (
    <Stack gap='16px'>
      <Stack
        direction='row'
        alignItems='center'
        gap='8px'
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(-1)
        }}
      >
        <ChevronLeftIcon />
        <Typography fontFamily='GothamProMedium'>Ortga qaytish</Typography>
      </Stack>
      <Stack
        width='100%'
        borderRadius='16px'
        p='24px'
        mx='auto'
        gap='24px'
        bgcolor={theme => theme.palette.allColors.WHITE}
      >
        <Form onSubmit={form.handleSubmit(onCreate)}>
          {socialParams?.status === 'created' ? (
            <Stack
              direction='row'
              width='100%'
              padding='0 0 24px 0'
              justifyContent='flex-end'
              gap='12px'
            >
              {location.state?.by_user === 'farmer' && (
                <Button
                  sx={{ backgroundColor: 'grey !important', opacity: '.7' }}
                  onClick={() => {
                    window.open(signedDocument?.signer, '_blank')
                  }}
                >
                  Imzolanganlar
                </Button>
              )}
              <Button sx={{ backgroundColor: '#08705F' }} type='submit'>
                Tasdiqlash
              </Button>
            </Stack>
          ) : (
            <Stack
              direction='row'
              width='100%'
              padding='24px 0'
              justifyContent='flex-end'
              gap='16px'
            >
              {location.state?.by_user === 'farmer' && (
                <Button
                  sx={{ backgroundColor: 'grey !important', opacity: '.7' }}
                  onClick={() => {
                    window.open(signedDocument?.signer, '_blank')
                  }}
                >
                  Imzolanganlar
                </Button>
              )}
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
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} sm={12} md={location.state?.by_user === 'farmer' ? 12 : 8}>
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
            {location.state?.by_user === 'user' && (
              <Grid item xs={12} sm={12} md={4}>
                <SignedCompanies>
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    fontFamily='GothamProRegular'
                    mb='8px'
                    color={COLORS.GREY10}
                  >
                    Shartnoma raqami: <span>{detail?.contract_id}</span>
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontWeight={600}
                    fontFamily='GothamProRegular'
                    mb='12px'
                  >
                    Imzolovchilar
                  </Typography>
                  <Stack gap='12px'>
                    {signedCompanies.map((document, i: number) => {
                      return (
                        <Card key={i}>
                          <Typography color='#004085' fontSize={14} fontFamily={'GothamProRegular'}>
                            Tashkilot: <span>“SEMURG INSURANCE” AJ</span>
                          </Typography>
                          <Typography color='#004085' fontSize={14} fontFamily={'GothamProRegular'}>
                            Status:{' '}
                            <span style={{ color: getStatus2(detail?.status_code)?.color }}>
                              {getStatus2(detail?.status_code)?.text}
                            </span>
                          </Typography>
                        </Card>
                      )
                    })}
                    <Card>
                      <Typography color='#004085' fontSize={14} fontFamily={'GothamProRegular'}>
                        Tashkilot: <span>{detail?.application?.farmer_name}</span>
                      </Typography>
                      <Typography color='#004085' fontSize={14} fontFamily={'GothamProRegular'}>
                        Status:{' '}
                        <span
                          style={{ color: getStatus2(detail?.user_acceptance?.accepted)?.color }}
                        >
                          {getStatus2(detail?.user_acceptance?.accepted)?.text}
                        </span>
                      </Typography>
                    </Card>
                  </Stack>
                </SignedCompanies>
              </Grid>
            )}
          </Grid>
        </Form>
        <LoadingOverlay isLoading={isLoading || isLoadingAccept} />
      </Stack>
    </Stack>
  )
}

export default CreateCropInsurance
