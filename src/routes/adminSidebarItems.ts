import AdminDashboard from "@/pages/dashboard/Admin/AdminDashboard"
import AdminParcels from "@/pages/dashboard/Admin/AdminParcels"
import AdminUsers from "@/pages/dashboard/Admin/AdminUsers"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Delivery",
    items: [
      {
        title: "Admin Dashboard",
        url: "adminDashboard", // ✅
        component: AdminDashboard,
      },
      {
        title: "Admin Parcels",
        url: "adminParcels", // ✅
        component: AdminParcels,
      },
      {
        title: "Admin Users",
        url: "adminUsers", // ✅
        component: AdminUsers,
      },
      {
        title: "Settings",
        url: "settings", // ✅
        component: Settings,
      },
    ],
  },
]
