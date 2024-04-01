interface Option {
  value: string | number
  label: string
}

export const resultOptions: Option[] = [
  { value: 0, label: '扣除萌萌点' },
  { value: 1, label: '禁言' },
  { value: 2, label: '封禁' },
  { value: 3, label: '删除用户' }
]

export const resultMap = new Map<number, string>([
  [1, '禁言'],
  [2, '封禁'],
  [3, '删除用户']
])

export const resultMapReverse = new Map<string, number>([
  ['禁言', 1],
  ['封禁', 2],
  ['删除用户', 3]
])
