import { Input } from '@/components/inputs/input'
import { Button, Grid, Stack } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { PaperWrapper } from './style'
import { Form } from 'react-router-dom'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface FormValues {
  status_plan: string
  percent: string
}

const PageContent = () => (
  <View style={styles.page}>
    <Text style={styles.text}>Page Content Here</Text>
  </View>
)

const pages = Array.from({ length: 5 }, (_, index) => <PageContent key={index} />)

const CreateCoverageInsurance = () => {
  const form = useForm<FormValues>()

  const onCreate: SubmitHandler<FormValues> = data => {
    console.log(data)
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
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid item xs={6} sm={3} md={3}>
            <Stack gap='10px'>
              <Stack
                direction='row'
                spacing={1}
                alignItems='flex-end'
                justifyContent='space-between'
              >
                <Input
                  control={form.control}
                  name='status_plan'
                  placeholder='Tarif rejasi'
                  label='Tarif rejasi (franshiza)'
                  type='number'
                  sx={{ width: '68%' }}
                />
                <Input
                  control={form.control}
                  name='percent'
                  placeholder='Tarif rejasi'
                  label=''
                  type='number'
                  sx={{ width: '30%' }}
                />
              </Stack>
              <Button type='submit' sx={{ maxWidth: 173, backgroundColor: 'var()' }}>
                Tasdiqlash
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={9} md={9}>
            <PaperWrapper>
              {/* <Paper>
                <Content></Content>
              </Paper> */}
              <Document>
                {pages.map((page, index) => (
                  <Page key={index} size='A4'>
                    {page}
                  </Page>
                ))}
              </Document>
            </PaperWrapper>
          </Grid>
        </Grid>
      </Form>
    </Stack>
  )
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
})

export default CreateCoverageInsurance
