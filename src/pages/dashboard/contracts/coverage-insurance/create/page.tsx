import { Input } from '@/components/inputs/input'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Content, Paper, PaperWrapper } from './style'
import { Form } from 'react-router-dom'

interface FormValues {
  status_plan: string
  percent: string
}

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
              <Button type='submit' sx={{ maxWidth: 173, backgroundColor: 'var(--Green)' }}>
                Tasdiqlash
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={9} md={9}>
            <PaperWrapper>
              <Paper>
                <Content>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eius odio tempora
                    quia repellat nihil modi quaerat, laborum aspernatur quidem rerum similique
                    reiciendis vel laboriosam voluptatibus hic nemo, minus placeat, saepe omnis sit.
                    Adipisci ipsa at, maiores illum corrupti incidunt facere dicta dignissimos,
                    inventore tempore consequatur, ex id atque qui.
                  </Typography>
                </Content>
              </Paper>
            </PaperWrapper>
          </Grid>
        </Grid>
      </Form>
    </Stack>
  )
}

export default CreateCoverageInsurance
