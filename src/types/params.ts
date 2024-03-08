import { type Params } from 'react-router-dom'

export interface ParamProps extends Params {
  mailingId: string
  categoryId: string
  customerId: string
  roboMarketAppId: string
}
