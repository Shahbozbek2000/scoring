import { type ErrorProps } from '@/types/error'
import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onError: res => {
    const error = res as ErrorProps
    console.log(error)
  },
})

const queryCache = new QueryCache({
  onError: res => {
    const error = res as ErrorProps
    console.log(error, 'errr')
    // if (error?.response?.status === 401) {
    //   window.location.href = '/'
    // }
  },
})

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, res) {
        const error = res as ErrorProps
        if (error.status === 404) return false
        if (failureCount < 1) return true
        return false
      },
    },
  },
})
