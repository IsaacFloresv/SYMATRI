import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryCLI.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.tsx';

// Styles
import './App.css'

//hooks and services

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App