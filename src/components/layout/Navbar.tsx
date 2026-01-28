import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Package } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const navigate = useNavigate()

  const { data } = useUserInfoQuery(undefined)

  const user = data?.data
  const userRole = user?.role
  const userId = user?._id


  // 🔹 dynamic dashboard path
  const getDashboardPath = () => {
    switch (userRole) {
      case "admin":
        return "/dashboard/admin/adminDashboard"
      case "sender":
        return "/dashboard/sender/senderDashboard"
      case "receiver":
        return "/dashboard/receiver/receiverDashboard"
      default:
        return "/login"
    }
  }

  const handleButtonClick = () => {
    navigate(getDashboardPath())
  }

  return (
    <header className="border-b">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ParcelHub
              </h1>
            </div>
          </Link>

          {/* Nav Links */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Conditional Button */}
          {userId ? (
            <Button className="cursor-pointer" onClick={handleButtonClick}>
              Enter Dashboard
            </Button>
          ) : (
            <Link to="/register">
              <Button className="cursor-pointer px-6">Get Started</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
