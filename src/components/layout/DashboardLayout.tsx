'use client'

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { AppSidebar } from "../app-sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useGetProfileQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"

export default function DashboardLayout() {
  const { data, isLoading, isError } = useGetProfileQuery(undefined)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap()
      window.location.href = "/login"
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-50 bg-white">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  {isLoading ? "Loading..." : data?.data?.name ?? "Profile"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-4">
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p className="text-red-500">Failed to load profile</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={data?.data?.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">{data?.data?.name}</p>
                        <p className="text-sm text-muted-foreground">{data?.data?.email}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Logout Button */}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="cursor-pointer"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
