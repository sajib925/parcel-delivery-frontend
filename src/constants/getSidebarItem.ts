import SenderDashboard from "@/pages/dashboard/sender/SenderDashboard"
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard"
import AdminParcels from "@/pages/dashboard/admin/AdminParcels"
import AdminUsers from "@/pages/dashboard/admin/AdminUsers"
import ReceiverDashboard from "@/pages/dashboard/receiver/ReceiverDashboard"
import DashboardHome from "@/pages/dashboard/DashboardHome"
import type { ISidebarItem } from "@/types"

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        component: DashboardHome,
      },
      {
        title: "Send Parcel",
        url: "/dashboard/sender",
        component: SenderDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "All Parcels",
        url: "/dashboard/admin/parcels",
        component: AdminParcels,
      },
      {
        title: "Users",
        url: "/dashboard/admin/users",
        component: AdminUsers,
      },
    ],
  },
]

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        component: DashboardHome,
      },
      {
        title: "Admin Panel",
        url: "/dashboard/admin",
        component: AdminDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "All Parcels",
        url: "/dashboard/admin/parcels",
        component: AdminParcels,
      },
      {
        title: "Users",
        url: "/dashboard/admin/users",
        component: AdminUsers,
      },
    ],
  },
]

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        component: DashboardHome,
      },
      {
        title: "Received Parcels",
        url: "/dashboard/receiver",
        component: ReceiverDashboard,
      },
    ],
  },
]
