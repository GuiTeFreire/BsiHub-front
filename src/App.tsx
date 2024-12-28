import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
    return (
      <HelmetProvider>
        <ThemeProvider storageKey='bsihub-theme' defaultTheme='system'>
          <Helmet titleTemplate='%s | bsi.hub' />
          <Toaster richColors />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
  )
}