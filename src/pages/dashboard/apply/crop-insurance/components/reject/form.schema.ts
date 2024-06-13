/* eslint-disable quotes */
import * as yup from 'yup'

export const formSchema = yup.object().shape({
  comment: yup.string().required("Ushbu maydon to'ldirilishi shart"),
})
