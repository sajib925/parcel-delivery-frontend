import { createBrowserRouter } from "react-router"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import Track from "@/pages/Track"
import DashboardHome from "@/pages/dashboard/DashboardHome"
import SenderDashboard from "@/pages/dashboard/sender/SenderDashboard"
import ReceiverDashboard from "@/pages/dashboard/receiver/ReceiverDashboard"
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard"
import AdminParcels from "@/pages/dashboard/admin/AdminParcels"
import AdminUsers from "@/pages/dashboard/admin/AdminUsers"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
// import Layout from "@/components/layout/Layout"
// import DashboardLayout from "@/components/layout/DashboardLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import CommonLayout from "@/components/layout/CommonLayout"

export const router = createBrowserRouter([
  {
    Component: CommonLayout,
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
      {
        Component: Login,
        path: "login",
      },
      {
        Component: Register,
        path: "register",
      },
    ],
  },
  {
    Component: CommonLayout,
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        Component: DashboardHome,
        index: true,
      },
      {
        Component: SenderDashboard,
        path: "sender",
      },
      {
        Component: ReceiverDashboard,
        path: "receiver",
      },
      {
        Component: AdminDashboard,
        index: true,
        path: "admin",
      },
      {
        Component: AdminParcels,
        path: "admin/parcels",
      },
      {
        Component: AdminUsers,
        path: "admin/users",
      },
    ],
  },
])
