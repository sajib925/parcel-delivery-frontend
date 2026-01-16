"use client"

import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useGetProfileQuery } from "@/redux/features/auth/auth.api"

export default function Navigation() {
  const navigate = useNavigate()
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !localStorage.getItem("accessToken"),
  })

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ParcelHub
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
          <Link to="/track">
            <Button variant="ghost">Track</Button>
          </Link>
          {profile?.data?.user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
