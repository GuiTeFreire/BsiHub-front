import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { SignUp } from './pages/auth/sign-up'
import { ToDoList } from './pages/app/todo-list'
import { Classes } from './pages/app/classes/classes'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [{ path: '/', element: <Dashboard /> }],
    },
    {
        path: '/board',
        element: <AppLayout />,
        children: [{ path: '/board', element: <ToDoList /> }],
    },
    {
        path: '/classes',
        element: <AppLayout />,
        children: [{ path: '/classes', element: <Classes /> }],
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