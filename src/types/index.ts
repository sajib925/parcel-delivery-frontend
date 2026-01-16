
export interface ISidebarItem {
  title: string
  items: Array<{
    title: string
    url: string
    component?: React.ComponentType
  }>
}
