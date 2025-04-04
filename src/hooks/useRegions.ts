import { request } from '@/configs/requests'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery } from '@tanstack/react-query'

interface IRegion {
  region_soato: number
  region: string
}

export const useRegions = () => {
  const { data: regions = [] } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_REGIONS],
    queryFn: async () => await request('/data/regions'),
    select: res => {
      return res?.data?.map((v: IRegion) => {
        return {
          value: v?.region_soato,
          label: v?.region,
        }
      })
    },
  })

  return regions
}
