import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formSchema } from './form.schema'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/apis/login'
import { useNavigate } from 'react-router-dom'
import { ROUTER } from '@/constants/router'

interface FormValues {
  stir: string
  password: string
}

export const useLogin = () => {
  const navigate = useNavigate()
  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async data => await login(data),
    onSuccess: res => {
      localStorage.setItem('token', res?.data?.token)
      navigate(ROUTER.HOME)
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
