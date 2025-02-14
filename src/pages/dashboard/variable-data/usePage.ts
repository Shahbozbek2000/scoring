import { request } from '@/configs/requests'
import { useQuery } from '@tanstack/react-query'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

export const usePage = () => {
  const form = useForm()

  const {
    fields: paymentScheduleFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'payment_schedule',
  })
  const { fields: riskFactorsFields, append: riskFactorsAppend } = useFieldArray({
    control: form.control,
    name: 'risk_factors',
  })

  const { data = null } = useQuery({
    queryKey: ['config'],
    queryFn: async () => await request('config'),
    select: response => response.data,
    onSuccess: response => {
      form.reset({
        insurance_liability: response?.insurance?.insurance_liability,
        deductible_percentage: response?.insurance?.deductible_percentage,
        insurance_rate_percentage: response?.insurance?.insurance_rate_percentage,
      })

      // Handle payment schedule data
      if (response?.payment_schedule) {
        response.payment_schedule.forEach((scheduleItem: any) => {
          append(scheduleItem) // Append each item from the response
        })
      }
      if (response?.risk_factors) {
        response.risk_factors.forEach((scheduleItem: any) => {
          riskFactorsAppend(scheduleItem)
        })
      }
    },
  })

  const onSubmit: SubmitHandler<any> = data => {
    const payload = {
      insurance: {
        insurance_liability: data?.insurance_liability,
        deductible_percentage: data?.deductible_percentage,
        insurance_rate_percentage: data?.insurance_rate_percentage,
      },
      payment_schedule: data?.payment_schedule,
      risk_factors: data?.risk_factors,
    }
    console.log(payload, 'payload')
  }

  return {
    form,
    data,
    append,
    remove,
    onSubmit,
    riskFactorsFields,
    riskFactorsAppend,
    paymentScheduleFields,
  }
}
