import { ReactComponent as IconApply } from '@/assets/icons/apply.svg'
import { ReactComponent as IconScoring } from '@/assets/icons/scoring.svg'
import { ReactComponent as IconContracts } from '@/assets/icons/contracts.svg'
import { ReactComponent as IconLandAreas } from '@/assets/icons/land-areas.svg'
import { ReactComponent as IconCropLocation } from '@/assets/icons/crop-location.svg'
import { ReactComponent as IconBankLending } from '@/assets/icons/bank-lending.svg'
import { ReactComponent as IconMonitoring } from '@/assets/icons/monitoring.svg'
import { ReactComponent as IconAgroActivities } from '@/assets/icons/agro-activities.svg'
import { ReactComponent as IconStatistics } from '@/assets/icons/statistics.svg'
import { ReactComponent as IconTechnicSupport } from '@/assets/icons/technical-support.svg'
import { ReactComponent as IconDocuments } from '@/assets/icons/documents.svg'
import { ReactComponent as IconPersonal } from '@/assets/icons/personal.svg'

export const pages = [
  {
    id: 1,
    name: 'Arizalar',
    Icon: IconApply,
    link: 'apply',
    disabled: false,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 2,
    name: 'Skoring',
    Icon: IconScoring,
    link: '/main',
    disabled: true,
    show: false,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 2,
    name: 'O`zgaruvchan ma`lumotlar',
    Icon: IconPersonal,
    link: 'variable-data',
    disabled: false,
    show: true,
    permissions: ['semurg'],
  },
  {
    id: 3,
    name: 'Shartnomalar',
    Icon: IconContracts,
    link: 'contracts',
    disabled: false,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 4,
    name: 'Yer maydonlari',
    Icon: IconLandAreas,
    link: 'land-areas',
    disabled: false,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 5,
    name: 'Ekin joylashuvi',
    Icon: IconCropLocation,
    link: 'crop-location',
    disabled: false,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 6,
    name: 'Bank kreditlash',
    Icon: IconBankLending,
    link: '/main',
    disabled: true,
    show: false,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 7,
    name: 'Monitoring',
    Icon: IconMonitoring,
    link: '/main',
    disabled: true,
    show: false,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 8,
    name: 'Agrotexnik tadbirlar',
    Icon: IconAgroActivities,
    link: '/main',
    disabled: true,
    show: false,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 10,
    name: 'To‘lov holati',
    Icon: IconStatistics,
    link: 'payment-status',
    disabled: false,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 11,
    name: 'Texnik yordam',
    Icon: IconTechnicSupport,
    link: 'technical-support',
    disabled: true,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
  {
    id: 12,
    name: 'Hisobotlar',
    Icon: IconDocuments,
    link: 'documents',
    disabled: true,
    show: true,
    permissions: ['semurg', 'semurg-user'],
  },
]
