interface Option {
  value: string
  label: string
}

export const section: Option[] = [
  { value: 'g-walkthrough', label: 'G-攻略' },
  { value: 'g-chatting', label: 'G-闲聊' },
  { value: 'g-seeking', label: 'G-寻求资源' },
  { value: 'g-news', label: 'G-资讯' },
  { value: 'g-releases', label: 'G-新作消息' },
  { value: 'g-other', label: 'G-其它' },

  { value: 't-crack', label: 'T-逆向工程' },
  { value: 't-languages', label: 'T-编程语言' },
  { value: 't-practical', label: 'T-实用技术' },
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
  { value: 'o-other', label: 'O-其它' },
]
