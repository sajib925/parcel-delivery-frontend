import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminParcels from "@/pages/Admin/AdminParcels";
import AdminUsers from "@/pages/Admin/AdminUsers";
// import Analytics from "@/pages/Admin/Analytics";
import { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
//   {
//     title: "Dashboard",
//     items: [
//       {
//         title: "Analytics",
//         url: "/admin/analytics",
//         component: Analytics,
//       },
//     ],
//   },
  {
    title: "Parcel Delivery",
    items: [
      {
        title: "admin Dashboard",
        url: "/admin/adminDashboard",
        component: AdminDashboard,
      },
      {
        title: "Admin Parcels",
        url: "/admin/adminParcels",
        component: AdminParcels,
      },
      {
        title: "Admin Users",
        url: "/admin/adminUsers",
        component: AdminUsers,
      },
    ],
  },
];
