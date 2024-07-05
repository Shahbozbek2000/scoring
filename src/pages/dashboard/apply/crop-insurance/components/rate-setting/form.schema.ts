import * as yup from 'yup'

export const formSchema = yup.object().shape({
  insurance_rate_percentage: yup
    .string()
    .required('Ushbu maydon to`ldirilishi shart!')
    .test('is-greater-than', 'Qiymat yuzdan kichik bo`lishi shart!', (value: any) => {
      return !isNaN(value) && parseFloat(value) <= 100
    }),
  // paymentPercentage: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       date: yup.string().required('Sana majburiy'),
  //       amount: yup
  //         .number()
  //         .required('Foiz majburiy')
  //         .nullable()
  //         .min(0, 'Foiz 0 dan kichik bo`lmasligi kerak'),
  //     }),
  //   )
  //   .test(
  //     'total-amount',
  //     'Foizlarning yig‘indisi 100% dan oshmasligi kerak',
  //     function (paymentPercentage) {
  //       const totalAmount: any = paymentPercentage?.reduce(
  //         (acc, curr) => acc + (curr.amount || 0),
  //         0,
  //       )
  //       return totalAmount <= 100
  //     },
  //   ),
})
