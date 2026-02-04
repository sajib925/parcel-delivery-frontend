import AdminDashboard from "@/pages/dashboard/Admin/AdminDashboard"
import AdminParcels from "@/pages/dashboard/Admin/AdminParcels"
import AdminUsers from "@/pages/dashboard/Admin/AdminUsers"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"
import { Home, Package, Users, Settings as SettingsIcon } from "lucide-react"

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Delivery",
    items: [
      {
        title: "Dashboard",
        url: "adminDashboard",
        icon: Home,
        component: AdminDashboard,
      },
      {
        title: "Parcels Management",
        url: "adminParcels", 
        icon: Package,
        component: AdminParcels,
      },
      {
        title: "Users Management",
        url: "adminUsers",
        icon: Users,
        component: AdminUsers,
      },
      {
        title: "Settings",
        url: "settings", 
        icon: SettingsIcon,
        component: Settings,
      },
    ],
  },
]
