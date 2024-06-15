import { ReactComponent as IconApply } from '@/assets/icons/apply.svg'
import { ReactComponent as IconScoring } from '@/assets/icons/scoring.svg'

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

export const pages = [
  {
    id: 1,
    name: 'Kreditni qoplash sug’urtasi',
    Icon: IconApply,
    link: 'coverage-insurance',
    disabled: false,
    show: true,
  },
  {
    id: 2,
    name: 'Xosil sug’urtasi',
    Icon: IconScoring,
    link: '/main/apply/crop-insurance',
    disabled: false,
    show: true,
  },
]
