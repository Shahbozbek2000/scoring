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

  const { data = null } = useQuery({
    queryKey: ['config'],
    queryFn: async () => await request('config'),
    select: response => response.data,
    onSuccess: response => {
      if (response?.risk_factors) {
        const riskFactorDefaults = response.risk_factors.reduce((acc: any, factor: any) => {
          acc[factor.key] = factor.active
          acc[factor.key + '_text'] = factor.text
          return acc
        }, {})

        // Reset the main form values
        form.reset({
          insurance_liability: response?.insurance?.insurance_liability,
          deductible_percentage: response?.insurance?.deductible_percentage,
          insurance_rate_percentage: response?.insurance?.insurance_rate_percentage,
          ...riskFactorDefaults,
        })

        // Handle payment schedule data
        if (response?.payment_schedule) {
          response.payment_schedule.forEach((scheduleItem: any) => {
            append(scheduleItem) // Append each item from the response
          })
        }
      }
    },
  })

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data, 'data')
    const payload = {
      insurance: {
        insurance_liability: data?.insurance_liability,
        deductible_percentage: data?.deductible_percentage,
        insurance_rate_percentage: data?.insurance_rate_percentage,
      },
      payment_schedule: data?.payment_schedule,
      risk_factors: [],
    }
    console.log(payload, 'payload')
  }

  return { form, data, append, remove, onSubmit, paymentScheduleFields }
}
