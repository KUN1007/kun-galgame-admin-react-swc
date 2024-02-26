import { RouteObject } from './types'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import KunLayout from '@/layout'

import { CommentPage } from '@/pages/comment'
import { LoginPage } from '@/pages/login'
import NoticePage from '@/pages/notice'
import OverviewPage from '@/pages/overview'
import { ReplyPage } from '@/pages/reply'
import { TopicPage } from '@/pages/topic'
import UserPage from '@/pages/user'

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
        path: '/comment',
        element: <CommentPage />,
      },
      {
        path: '/overview',
        element: <OverviewPage />,
      },
      {
        path: '/notice',
        element: <NoticePage />,
      },
      {
        path: '/reply',
        element: <ReplyPage />,
      },
      {
        path: '/topic',
        element: <TopicPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
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
