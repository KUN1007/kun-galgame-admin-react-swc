interface MenuItem {
  key: string
  label: string
  children?: MenuItem[]
}

export const menuItem: MenuItem[] = [
  {
    key: 'overview',
    label: '论坛概览'
  },
  {
    key: 'user',
    label: '用户管理'
  },
  {
    key: 'galgame',
    label: 'Galgame 管理'
  },
  {
    key: 'topic',
    label: '话题管理'
  },
  {
    key: 'reply',
    label: '回复管理'
  },
  {
    key: 'comment',
    label: '评论管理'
  },
  {
    key: 'notice',
    label: '公告管理',
    children: [
      {
        key: 'notice/update-log',
        label: '更新记录'
      },
      {
        key: 'notice/non-moe',
        label: '不萌记录'
      },
      {
        key: 'notice/balance',
        label: '收支公示'
      },
      {
        key: 'notice/message-admin',
        label: '全体消息'
      }
    ]
  },
  {
    key: 'report',
    label: '举报管理'
  },
  {
    key: 'info',
    label: '操作记录'
  },
  {
    key: 'logout',
    label: '退出登录'
  }
]
