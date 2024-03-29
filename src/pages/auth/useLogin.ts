import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './form.schema'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/apis/login'
import { ROUTER } from '@/constants/router'

interface FormValues {
  login: string
  password: string
}

export const useLogin = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async data => await login(data),
    onSuccess: res => {
      localStorage.setItem('token', res?.data?.token)
      sessionStorage.setItem('token', res?.data?.token)
      // navigate(ROUTER.HOME)
      window.location.href = ROUTER.HOME
    },
    onError: () => {},
  })

  const onLogin: SubmitHandler<FormValues | any> = credentials => {
    mutate(credentials)
  }

  return {
    form,
    onLogin,
    isLoading,
  }
}
