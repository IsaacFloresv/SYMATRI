import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryCLI.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.tsx';
import { Toaster } from 'sonner'

// Styles
import './App.css'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* Sonner Toaster — muestra todos los `toast()` de la app */}
      <Toaster position="top-right" richColors toastOptions={{ duration: 1000 }} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App