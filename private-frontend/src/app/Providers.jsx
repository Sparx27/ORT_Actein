import { BrowserRouter } from 'react-router-dom'
import { BreadcrumbProvider } from '../layouts/context/BreadcrumbContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from '../shared/auth/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BreadcrumbProvider>
          <BrowserRouter>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </BreadcrumbProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default Providers