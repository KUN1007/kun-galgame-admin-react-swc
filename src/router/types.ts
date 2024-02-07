export interface MetaProps {
  title: string
  key?: string
  icon?: string
  keepAlive?: boolean
  orderNo?: number
  hideMenu?: boolean
  hideChildrenInMenu?: boolean
}

export interface RouteObject {
  element?: React.ReactNode
  path?: string
  children?: RouteObject[]
  index?: false
  meta?: MetaProps
}
