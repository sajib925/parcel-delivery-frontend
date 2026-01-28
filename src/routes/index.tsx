import { createBrowserRouter, Navigate } from "react-router"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import Track from "@/pages/Track"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import App from "@/App"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { role } from "@/constants/role"
import { adminSidebarItems } from "./adminSidebarItems"
import { senderSidebarItems } from "./senderSidebarItems"
import { receiverSidebarItems } from "./receiverSidebarItems"
import { TRole } from "@/types"
import { withAuth } from "@/utils/withAuth"
import { generateRoutes } from "@/utils/generateRoutes"
import Unauthorized from "@/pages/Unauthorized"

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Track,
        path: "track",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/dashboard/admin",
    children: [
      { index: true, element: <Navigate to="/dashboard/admin/adminDashboard" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/dashboard/sender",
    children: [
      { index: true, element: <Navigate to="/dashboard/sender/senderDashboard" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/dashboard/receiver",
    children: [
      { index: true, element: <Navigate to="/dashboard/receiver/receiverDashboard" /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  {
      Component: Login,
      path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
])
