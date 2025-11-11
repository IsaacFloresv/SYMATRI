import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryCLI.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/routes.tsx';

// Styles
import './App.css'

//hooks and services
import { useEffect } from 'react';
import { getMe } from './services/authServices.ts';
import { useAuthStorage } from './hooks/useAuthStorage.ts';

function App() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      getMe(user)
        .then(user => {
          useAuthStorage.getState().setUser(user);
        }).catch(err => {
          useAuthStorage.getState().setUser(null);
          console.error("Error al obtener el usuario en sesion:", err);
        })
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App