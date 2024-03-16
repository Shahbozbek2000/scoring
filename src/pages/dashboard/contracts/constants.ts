import { ReactComponent as IconApply } from '@/assets/icons/apply.svg'
import { ReactComponent as IconScoring } from '@/assets/icons/scoring.svg'

export const pages = [
  {
    id: 1,
    name: 'Kreditni qoplash sug’urtasi',
    Icon: IconApply,
    link: 'coverage-insurance',
    disabled: false,
  },
  { id: 2, name: 'Xosil sug’urtasi', Icon: IconScoring, link: 'crop-insurance', disabled: true },
]
