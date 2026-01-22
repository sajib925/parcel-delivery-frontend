
export interface ISidebarItem {
  title: string
  items: Array<{
    title: string
    url: string
    component?: React.ComponentType
  }>
}


export type TRole = "ADMIN" | "RECEIVER" | "SENDER";