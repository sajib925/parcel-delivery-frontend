import ReceiverDashboard from "@/pages/dashboard/Receiver/ReceiverDashboard"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receive",
    items: [
      {
        title: "Receive",
        url: "receiverDashboard", 
        component: ReceiverDashboard,
      },
      {
        title: "Settings",
        url: "settings",
        component: Settings,
      },
    ],
  },
]
