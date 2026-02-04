import ReceiverDashboard from "@/pages/dashboard/Receiver/ReceiverDashboard"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"
import { Home, SettingsIcon } from "lucide-react"

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receive",
    items: [
      {
        title: "Dashboard",
        url: "receiverDashboard",
        icon: Home,
        component: ReceiverDashboard,
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
