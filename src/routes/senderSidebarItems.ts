import SenderDashboard from "@/pages/dashboard/Sender/SenderDashboard"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "Send",
        url: "senderDashboard",
        component: SenderDashboard,
      },
      {
        title: "Settings",
        url: "settings",
        component: Settings,
      },
    ],
  },
]
