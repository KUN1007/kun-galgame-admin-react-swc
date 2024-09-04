interface Option {
  value: string
  label: string
}

export const section: Option[] = [
  { value: 'g-chatting', label: 'G-闲聊' },
  { value: 'g-article', label: 'G-文章' },
  { value: 'g-walkthrough', label: 'G-攻略' },
  { value: 'g-seeking', label: 'G-寻求资源' },
  { value: 'g-news', label: 'G-资讯' },
  { value: 'g-releases', label: 'G-新作消息' },
  { value: 'g-other', label: 'G-其它' },

  { value: 't-crack', label: 'T-逆向工程' },
  { value: 't-languages', label: 'T-编程语言' },
  { value: 't-practical', label: 'T-实用技术' },
  { value: 't-help', label: 'T-请求帮助' },
  { value: 't-linux', label: 'T-Linux' },
  { value: 't-web', label: 'T-Web' },
  { value: 't-android', label: 'T-Android' },
  { value: 't-adobe', label: 'T-Adobe' },
  { value: 't-ai', label: 'T-AI' },
  { value: 't-algorithm', label: 'T-算法' },
  { value: 't-other', label: 'T-其它' },

  { value: 'o-anime', label: 'O-动漫' },
  { value: 'o-comics', label: 'O-漫画' },
  { value: 'o-music', label: 'O-音乐' },
  { value: 'o-novel', label: 'O-轻小说' },
  { value: 'o-essay', label: 'O-个人随笔' },
  { value: 'o-daily', label: 'O-日常' },
  { value: 'o-forum', label: 'O-论坛相关' },
  { value: 'o-other', label: 'O-其它' }
]

export const sectionMap: Record<string, string> = {
  'g-chatting': 'G-闲聊',
  'g-article': 'G-文章',
  'g-walkthrough': 'G-攻略',
  'g-seeking': 'G-寻求资源',
  'g-news': 'G-资讯',
  'g-releases': 'G-新作消息',
  'g-other': 'G-其它',

  't-crack': 'T-逆向工程',
  't-languages': 'T-编程语言',
  't-practical': 'T-实用技术',
  't-help': 'T-请求帮助',
  't-linux': 'T-Linux',
  't-web': 'T-Web',
  't-android': 'T-Android',
  't-adobe': 'T-Adobe',
  't-ai': 'T-AI',
  't-algorithm': 'T-算法',
  't-other': 'T-其它',

  'o-anime': 'O-动漫',
  'o-comics': 'O-漫画',
  'o-music': 'O-音乐',
  'o-novel': 'O-轻小说',
  'o-essay': 'O-个人随笔',
  'o-daily': 'O-日常',
  'o-forum': 'O-论坛相关',
  'o-other': 'O-其它'
}

export const sectionColorMap: Record<string, string> = {
  g: 'border-blue-600 text-blue-600',
  t: 'border-green-600 text-green-600',
  o: 'border-pink-600 text-pink-600'
}
