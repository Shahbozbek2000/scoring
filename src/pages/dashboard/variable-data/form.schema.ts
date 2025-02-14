import * as yup from 'yup'

const validationSchema = yup.object().shape({
  insurance_liability: yup
    .number()
    .typeError('Iltimos raqam kiriting')
    .required('Majburiy maydon')
    .positive('Musbat son kiriting'),
  deductible_percentage: yup
    .number()
    .typeError('Iltimos raqam kiriting')
    .required('Majburiy maydon')
    .min(0, 'Noldan katta son kiriting')
    .max(100, 'Maksimal qiymat 100'),
  insurance_rate_percentage: yup
    .number()
    .typeError('Iltimos raqam kiriting')
    .required('Majburiy maydon')
    .min(0, 'Noldan katta son kiriting')
    .max(100, 'Maksimal qiymat 100'),
  risk_factors: yup.array().of(
    yup.object().shape({
      active: yup.boolean(),
      text: yup.string().when('active', {
        is: true,
        then: schema => schema.required('Majburiy maydon'),
      }),
    }),
  ),
})

export type FormValues = yup.InferType<typeof validationSchema>
export default validationSchema
