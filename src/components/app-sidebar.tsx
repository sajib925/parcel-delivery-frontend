import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItems } from "@/utils/getSidebar"
import "react-loading-skeleton/dist/skeleton.css"
import { TRole } from "@/types"
import { LogOut, Package } from "lucide-react"
import { baseApi } from "@/redux/baseApi"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: userData } = useUserInfoQuery(undefined)
  const roleFromApi = userData?.data?.role ?? ""
  const normalizedRole = roleFromApi.toUpperCase() as TRole
  const navMain = getSidebarItems(normalizedRole)

  const [logout] = useLogoutMutation()


  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap() 
      baseApi.util.resetApiState() 
      window.location.href = "/login"
    } catch (err) {
      console.error("Logout failed", err)
    }
  }


  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16 flex items-start justify-center">
        <Link to="/">
          <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ParcelHub
              </h1>
            </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          {navMain.map((group) => (
            
            <SidebarGroup key={group.title}>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url} className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 ">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 w-full cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
