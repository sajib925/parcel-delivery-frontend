import SenderDashboard from "@/pages/dashboard/Sender/SenderDashboard"
import Settings from "@/pages/dashboard/Settings"
import { ISidebarItem } from "@/types"
import { Home, SettingsIcon } from "lucide-react"

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "Dashboard",
        url: "senderDashboard",
        icon: Home,
        component: SenderDashboard,
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
