import { CustomRadioGroup } from '@/components/radio'
import { Stack } from '@mui/material'

export const filter = [
  {
    value: 'apply_status',
    label: 'Ariza statusi',
  },
  {
    value: 'company_name',
    label: 'Korxona nomi',
  },
  {
    value: 'region',
    label: 'Viloyat',
  },
  {
    value: 'district',
    label: 'Tuman',
  },
  {
    value: 'type',
    // eslint-disable-next-line quotes
    label: "Sug'urta turi",
  },
  {
    value: 'apply_date',
    label: 'Ariza sanasi',
  },
]

export const Header = () => {
  return (
    <Stack
      width='100%'
      borderRadius='12px'
      p='32px 24px'
      mx='auto'
      gap='24px'
      bgcolor={theme => theme.palette.allColors.WHITE}
    >
      <CustomRadioGroup options={filter} />
    </Stack>
  )
}
