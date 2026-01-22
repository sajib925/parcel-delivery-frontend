import DashboardHome from "@/pages/Sender/SenderDashboard";
import { ISidebarItem } from "@/types";

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "Send",
        url: "/sender/senderDashboard",
        component: DashboardHome,
      },
    ],
  },
];
