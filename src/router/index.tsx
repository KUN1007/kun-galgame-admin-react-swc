import { lazy } from 'react'
import { lazyLoad } from './utils/lazyLoad'
import { RouteObject } from './types'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import KunLayout from '@/layout'

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/overview' />
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/pages/login'))),
    meta: {
      title: 'Login',
      key: 'login'
    }
  },
  {
    path: '/',
    element: <KunLayout />,
    children: [
      {
        path: '/comment',
        element: lazyLoad(lazy(() => import('@/pages/comment')))
      },
      {
        path: '/overview',
        element: lazyLoad(lazy(() => import('@/pages/overview')))
      },
      {
        path: '/notice',
        children: [
          {
            path: 'update-log',
            element: lazyLoad(lazy(() => import('@/pages/update-log')))
          },
          {
            path: 'non-moe',
            element: lazyLoad(lazy(() => import('@/pages/non-moe')))
          },
          {
            path: 'balance',
            element: lazyLoad(lazy(() => import('@/pages/balance')))
          }
        ]
      },
      {
        path: '/reply',
        element: lazyLoad(lazy(() => import('@/pages/reply')))
      },
      {
        path: '/topic',
        element: lazyLoad(lazy(() => import('@/pages/topic')))
      },
      {
        path: '/user',
        element: lazyLoad(lazy(() => import('@/pages/user')))
      },
      {
        path: '/info',
        element: lazyLoad(lazy(() => import('@/pages/info')))
      },
      {
        path: '/report',
        element: lazyLoad(lazy(() => import('@/pages/report')))
      },
      {
        path: '/galgame',
        element: lazyLoad(lazy(() => import('@/pages/galgame')))
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

const router = createBrowserRouter(rootRoutes)

export default router
