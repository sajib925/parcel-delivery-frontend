import { adminSidebarItems, receiverSidebarItems } from "@/constants/getSidebarItem"
import { ISidebarItem } from "@/types"

export const getSidebarItems = (role?: string): ISidebarItem[] => {
  if (role === "ADMIN" || role === "SENDER") {
    return adminSidebarItems
  }

  if (role === "RECEIVER") {
    return receiverSidebarItems
  }

  return []
}
