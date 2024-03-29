import * as yup from 'yup'

export const formSchema = yup.object().shape({
  insurance_liability: yup
    .string()
    .required('Ushbu maydon to`ldirilishi shart!')
    .test('is-greater-than', 'Qiymat yuzdan kichik bo`lishi shart!', (value: any) => {
      return !isNaN(value) && parseFloat(value) <= 100
    }),
})
