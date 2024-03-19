import { ReactComponent as IconPolis } from '@/assets/icons/polis.svg'
import { ReactComponent as IconContractDocuments } from '@/assets/icons/contract-documents.svg'

export const pages = [
  { id: 1, name: 'Polis', Icon: IconPolis, link: 'polis', disabled: false },
  {
    id: 2,
    name: 'Shartnomalar hisoboti',
    Icon: IconContractDocuments,
    link: 'contract-documents',
    disabled: true,
  },
  { id: 3, name: 'Statistika', Icon: IconContractDocuments, link: 'statistics', disabled: false },
]
