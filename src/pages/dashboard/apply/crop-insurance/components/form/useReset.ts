import { getByIDApplications } from '@/apis/applications'
import { DATE_FORMAT } from '@/constants/format'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

interface IReset {
  id: string | null | undefined
  form: any
}

export const useReset = ({ id, form }: IReset) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_BY_ID_APPLICATIONS, id],
    queryFn: async () => await getByIDApplications(id),
    select: res => {
      return res?.data
    },
    onSuccess: response => {
      form.reset({
        // ...response,
        date: dayjs(response?.date).format(DATE_FORMAT),
        // credit_area_contour_numbers: response?.credit_area_contour_numbers,
        crop_harvest_start: dayjs(response?.crop_harvest_start).format(DATE_FORMAT),
        crop_harvest_end: dayjs(response?.crop_harvest_end).format(DATE_FORMAT),
        insurance_liability: response?.insurance_liability,
        legal_location2: `${dayjs(response?.crop_harvest_start).format(DATE_FORMAT)} - ${dayjs(response?.crop_harvest_end).format(DATE_FORMAT)}`,
        region: response?.region_name,
        district: response?.district_name,
        credit_area_region_name:
          response?.credit_area_region_name || response?.credit_area_region_code,
        credit_area_district_name:
          response?.credit_area_district_name || response?.credit_area_district_code,
        credit_area_massiv_name:
          response?.credit_area_massiv_name || response?.credit_area_massiv_code,
      })
    },
    enabled: id !== null,
  })
}
