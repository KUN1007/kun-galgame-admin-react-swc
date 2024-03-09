import { lazy } from 'react'
import { lazyLoad } from './utils/lazyLoad'
import { RouteObject } from './types'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import KunLayout from '@/layout'

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/overview" />,
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/pages/login'))),
    meta: {
      title: 'Login',
      key: 'login',
    },
  },
  {
    path: '/',
    element: <KunLayout />,
    children: [
      {
        path: '/comment',
        element: lazyLoad(lazy(() => import('@/pages/comment'))),
      },
      {
        path: '/overview',
        element: lazyLoad(lazy(() => import('@/pages/overview'))),
      },
      {
        path: '/notice',
        element: lazyLoad(lazy(() => import('@/pages/notice'))),
      },
      {
        path: '/reply',
        element: lazyLoad(lazy(() => import('@/pages/reply'))),
      },
      {
        path: '/topic',
        element: lazyLoad(lazy(() => import('@/pages/topic'))),
      },
      {
        path: '/user',
        element: lazyLoad(lazy(() => import('@/pages/user'))),
      },
      {
        path: '/info',
        element: lazyLoad(lazy(() => import('@/pages/info'))),
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
