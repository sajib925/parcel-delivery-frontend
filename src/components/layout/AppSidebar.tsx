import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItems } from "@/utils/getSidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !localStorage.getItem("accessToken"),
  })

  const userRole = user?.role || profile?.data?.user?.role

  const data = {
    navMain: getSidebarItems(userRole),
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ParcelHub
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => (
                  <SidebarMenuItem key={menuItem.title}>
                    <SidebarMenuButton asChild>
                      <Link to={menuItem.url}>{menuItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
