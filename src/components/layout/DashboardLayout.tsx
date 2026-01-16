"use client"

import { Outlet, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "./AppSidebar"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !localStorage.getItem("accessToken"),
  })

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const userRole = user?.role || profile?.data?.user?.role
  console.log("from dashboard layout:", userRole)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user?.name || "User"}</span>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
