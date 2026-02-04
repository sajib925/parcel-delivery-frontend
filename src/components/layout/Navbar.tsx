"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Package, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useState } from "react"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { data } = useUserInfoQuery(undefined)

  const user = data?.data
  const userRole = user?.role
  const userId = user?._id

  const [open, setOpen] = useState(false)

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
    setOpen(false)
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">
                ParcelHub
              </h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-medium transition"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Button */}
          <div className="hidden md:block">
            {userId ? (
              <Button onClick={handleButtonClick}>
                Enter Dashboard
              </Button>
            ) : (
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-6 space-y-4 animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t">
              {userId ? (
                <Button
                  className="w-full cursor-pointer"
                  onClick={handleButtonClick}
                >
                  Enter Dashboard
                </Button>
              ) : (
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
