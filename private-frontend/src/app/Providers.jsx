import { BrowserRouter } from 'react-router-dom'
import { BreadcrumbProvider } from '../layouts/context/BreadcrumbContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BreadcrumbProvider>
        <BrowserRouter>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </BreadcrumbProvider>
    </QueryClientProvider>
  )
}

export default Providers