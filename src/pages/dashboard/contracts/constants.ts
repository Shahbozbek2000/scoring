import { ReactComponent as IconApply } from '@/assets/icons/apply.svg'
import { ReactComponent as IconScoring } from '@/assets/icons/scoring.svg'

export const pages = [
  { id: 1, name: 'Kreditni qoplash sug’urtasi', Icon: IconApply, link: 'apply', disabled: false },
  { id: 2, name: 'Xosil sug’urtasi', Icon: IconScoring, link: '/main', disabled: true },
]
