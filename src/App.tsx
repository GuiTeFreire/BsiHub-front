import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
    return (
      <HelmetProvider>
        <ThemeProvider storageKey='bsihub-theme' defaultTheme='system'>
          <Helmet titleTemplate='%s | bsi.hub' />
          <Toaster richColors />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
  )
}