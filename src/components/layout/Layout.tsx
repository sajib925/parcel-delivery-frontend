import { Outlet } from "react-router"
import Navigation from "@/components/Navigation"

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
    </div>
  )
}
