import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/404'
import { Home } from './pages/app/home'
import { ToDoList } from './pages/app/todo-list'
import { Classes } from './pages/app/classes/classes'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { ProtectedRoute } from './components/router/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> }, // Protegido
    ],
  },
  {
    path: '/board',
    // Rotas filhas também são protegidas, pois <AppLayout /> está dentro de <ProtectedRoute>
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/board', element: <ToDoList /> },
    ],
  },
  {
    path: '/classes',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/classes', element: <Classes /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
