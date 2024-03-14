import * as yup from 'yup'

export const formSchema = yup.object().shape({
  login: yup.string().required('Ushbu maydon to`ldirilishi shart!'),
  password: yup.string().required('Ushbu maydon to`ldirilishi shart!'),
})
