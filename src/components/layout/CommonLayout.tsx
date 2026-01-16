"use client"

import { Outlet, useLocation, useNavigate } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { AppSidebar } from "./AppSidebar"

export default function CommonLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const isDashboard = location.pathname.startsWith("/dashboard")
  const isAuth =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register")

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <header className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4" />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {user?.name || "User"}
                </span>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  Logout
                </Button>
              </div>
            </header>

            <div className="flex-1 p-4">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  }

  if (isAuth) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
