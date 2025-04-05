import { request } from '@/configs/requests'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import validationSchema, { type FormValues } from './form.schema'

interface Insurance {
  insurance_liability: number
  deductible_percentage: number
  insurance_rate_percentage: number
}

interface RiskFactor {
  active: boolean
  text: string
}

interface PaymentSchedule {
  days: number
  percentage: number
}

interface Crop {
  crop_name: string
  crop_type: string
  price: number
}

interface ConfigResponse {
  insurance: Insurance
  risk_factors: RiskFactor[]
  payment_schedule: PaymentSchedule[]
  crop_prices: Crop[]
}

interface ConfigPayload {
  insurance: Insurance
  risk_factors: RiskFactor[]
  payment_schedule: PaymentSchedule[]
}

export const usePage = () => {
  const form = useForm<FormValues | any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      insurance_liability: 0,
      deductible_percentage: 0,
      insurance_rate_percentage: 0,
      risk_factors: [],
      payment_schedule: [],
    },
  })

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
  const { fields: cropsFields, append: cropsAppend } = useFieldArray({
    control: form.control,
    name: 'crops',
  })

  const { isLoading } = useQuery({
    queryKey: ['config'],
    queryFn: async () => await request.get<ConfigResponse>('config'),
    select: response => response.data,
    onSuccess: response => {
      console.log(response, 'response')
      form.reset({
        insurance_liability: response?.insurance?.insurance_liability,
        deductible_percentage: response?.insurance?.deductible_percentage,
        insurance_rate_percentage: response?.insurance?.insurance_rate_percentage,
      })

      if (response?.payment_schedule) {
        response.payment_schedule.forEach((scheduleItem: any) => {
          append(scheduleItem)
        })
      }
      if (response?.risk_factors) {
        response.risk_factors.forEach((riskFactors: any) => {
          riskFactorsAppend(riskFactors)
        })
      }
      if (response?.crop_prices) {
        response?.crop_prices?.forEach((crop: any) => {
          cropsAppend(crop)
        })
      }
    },
  })

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (data: ConfigPayload | any) =>
      await request.patch<ConfigPayload>('config', data),
    onSuccess: () => {
      toast.success('Ma`lumotlar muvaffaqiyatli o`zgardi')
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err?.response?.data?.message || 'Nimadur xatolik yuz berdi!')
    },
  })

  const onSubmit: SubmitHandler<FormValues | any> = data => {
    const totalPercentage = data?.payment_schedule?.reduce(
      (sum: number, item: PaymentSchedule) => sum + Number(item.percentage),
      0,
    )

    if (totalPercentage !== 100) {
      toast.error('To`lov jadvali foizlari yig`indisi 100% bo`lishi kerak')
      return
    }

    const payload = {
      insurance: {
        insurance_liability: Number(data?.insurance_liability),
        deductible_percentage: Number(data?.deductible_percentage),
        insurance_rate_percentage: Number(data?.insurance_rate_percentage),
      },
      payment_schedule: data?.payment_schedule?.map((v: any) => {
        return {
          ...v,
          days: Number(v?.days),
          percentage: Number(v?.percentage),
        }
      }),
      risk_factors: data?.risk_factors,
      crop_prices: data?.crops?.map((v: any) => {
        return {
          ...v,
          price: Number(v?.price),
        }
      }),
    }
    mutate(payload)
  }

  return {
    form,
    append,
    remove,
    onSubmit,
    isLoading: isLoading || isSubmitting,
    cropsFields,
    riskFactorsFields,
    riskFactorsAppend,
    paymentScheduleFields,
  }
}
