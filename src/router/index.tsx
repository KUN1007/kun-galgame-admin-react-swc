import { RouteObject } from './types'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login'
import KunLayout from '@/layout'

const rootRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      title: '登录',
      key: 'login',
    },
  },
  {
    path: '/',
    element: <KunLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
]

const router = createBrowserRouter(rootRoutes)

export default router
