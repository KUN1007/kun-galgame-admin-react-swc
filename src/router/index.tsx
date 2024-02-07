import { RouteObject } from './types'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import KunLayout from '@/layout'

import LoginPage from '@/pages/login'
import OverviewPage from '@/pages/overview'

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/overview" />,
  },
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
        path: '/overview',
        element: <OverviewPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]

const router = createBrowserRouter(rootRoutes)

export default router
