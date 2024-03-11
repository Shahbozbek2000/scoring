import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './form.schema'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/apis/login'

interface FormValues {
  stir: string
  password: string
}

export const useLogin = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async data => await login(data),
    onSuccess: res => {
      console.log(res, 'res')
    },
    onError: () => {},
  })

  const onLogin = (credentials: FormValues | any) => {
    mutate(credentials)
  }

  return {
    form,
    onLogin,
    isLoading,
  }
}
