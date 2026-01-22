import DashboardHome from "@/pages/Receiver/ReceiverDashboard";
import { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receive",
    items: [
      {
        title: "Receive",
        url: "/receiver/receiverDashboard",
        component: DashboardHome,
      },
    ],
  },
];
