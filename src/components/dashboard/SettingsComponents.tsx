'use client'

import React, { useEffect, useState } from "react"
import { User, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/features/auth/auth.api"

export function SettingsComponents() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile")
  const [profileMessage, setProfileMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  console.log(profileMessage);

  /* ================= API ================= */

  const { data, isLoading, isError } = useGetProfileQuery(undefined)
  const [updateProfile, { isLoading: isProfileSaving }] =
    useUpdateProfileMutation()
  const [changePassword, { isLoading: isPasswordSaving }] =
    useChangePasswordMutation()

  const user = data?.data

  /* ================= STATE ================= */

  const [profileData, setProfileData] = useState<{
    name: string
    email: string
    phone: string
    address: string
    picture: string
    imageFile: File | null
  }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    picture: "",
    imageFile: null,
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        picture:
          user.picture ??
          "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      }))
    }
  }, [user])

//  HANDLERS 

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   setProfileData((prev) => ({
  //     ...prev,
  //     imageFile: file,
  //     picture: URL.createObjectURL(file),
  //   }))
  // }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage("")

    const formData = new FormData()
    formData.append("name", profileData.name)
    formData.append("phone", profileData.phone)
    formData.append("address", profileData.address)

    if (profileData.imageFile) {
      formData.append("image", profileData.imageFile)
    }

    try {
      await updateProfile(formData).unwrap()
      setProfileMessage("Profile updated successfully")
    } catch (err: any) {
      setProfileMessage(err?.data?.message || "Profile update failed")
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("Passwords do not match")
      return
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }).unwrap()

      setPasswordMessage("Password changed successfully")
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err: any) {
      setPasswordMessage(err?.data?.message || "Password update failed")
    }
  }

  //  UI 

  if (isLoading) return <p className="p-6">Loading profile...</p>
  if (isError) return <p className="p-6 text-red-500">Failed to load profile</p>

  return (
    <div className="w-full max-w-3xl">
      {/* Header */}
        <div className=" sticky top-10 z-20 flex justify-between p-4">
         <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={activeTab === "profile" ? "default" : "outline"}
              onClick={() => setActiveTab("profile")}
              className="cursor-pointer"
            >
              <User className="w-4 h-4 mr-1" /> Profile
            </Button>
            <Button
              size="sm"
              variant={activeTab === "password" ? "default" : "outline"}
              onClick={() => setActiveTab("password")}
              className="cursor-pointer"
            >
              <Lock className="w-4 h-4 mr-1" /> Password
            </Button>
          </div>
        </div>

      <div className="p-4 lg:p-6">
        {activeTab === "profile" ? (
          <Card className="p-6 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">
              Personal Information
            </h2>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Image */}
              <div className="flex flex-col items-center gap-4 max-w-50 w-full mx-auto">
                <img
                  src={profileData.picture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                {/* <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                /> */}
              </div>

              {/* Name */}
              <Input
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Full Name"
              />

              {/* Email (disabled) */}
              <Input
                name="email"
                value={profileData.email}
                disabled
              />

              {/* Phone */}
              <Input
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Phone"
              />

              {/* Address */}
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                rows={3}
                className="w-full border rounded-md p-2"
                placeholder="Address"
              />
              <div className="flex justify-end w-full">
                <Button type="submit" disabled={isProfileSaving} className="cursor-pointer">
                  {isProfileSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
              
            </form>
          </Card>
        ) : (
          <Card className="p-6 max-w-xl">
            <h2 className="text-lg font-semibold mb-4">
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
              />

              <Input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
              />

              <Input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
              />

              {passwordMessage && (
                <p className="text-sm text-green-600">
                  {passwordMessage}
                </p>
              )}
              <div className="flex justify-end w-full">
                <Button type="submit" disabled={isPasswordSaving} className="cursor-pointer">
                  {isPasswordSaving ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
