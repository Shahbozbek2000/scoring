import { array, bool, object, string, type InferType } from 'yup'

export const schema = object().shape({
  id: string().notRequired(),
  checkbox: bool().required().default(false),
  firstname: string().required('Familiya kiritish majburiy!').default(''),
  name: string().required('Ism kiritish majburiy!').default(''),
  country: string().default('').notRequired(),
  language: string().default('').notRequired(),
  phones: array()
    .of(
      object().shape({
        phone: string()
          .test({
            name: 'min length',
            test: val => {
              return !val?.includes('_')
            },
          })
          .default('')
          .notRequired(),
      }),
    )
    .notRequired()
    .default([]),
})

export type SchemaType = InferType<typeof schema>
