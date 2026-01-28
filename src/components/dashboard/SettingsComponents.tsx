'use client'

import React from "react"

import { useState } from 'react'
import { Menu, User, Lock, Mail, Phone, MapPin, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'



export function SettingsComponents() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  // Mock user data - replace with actual API data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1700000000',
    address: '123 Main Street, Dhaka, Bangladesh',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setProfileMessage('')

    try {
      // Replace with actual API call to /auth/profile or similar
      // const response = await updateProfileMutation(profileData).unwrap()
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProfileMessage('Profile updated successfully!')
      setTimeout(() => setProfileMessage(''), 3000)
    } catch (error) {
      setProfileMessage('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setPasswordMessage('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('New passwords do not match!')
      setIsSaving(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage('Password must be at least 8 characters long!')
      setIsSaving(false)
      return
    }

    try {
      // Replace with actual API call using changePasswordMutation
      // const response = await changePasswordMutation({
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword,
      // }).unwrap()
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPasswordMessage('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setPasswordMessage(''), 3000)
    } catch (error) {
      setPasswordMessage('Failed to change password. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-transparent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-4 bg-card border-b border-border overflow-x-auto">
          <Button
            onClick={() => setActiveTab('profile')}
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            size="sm"
            className="flex gap-2 bg-transparent whitespace-nowrap"
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
          <Button
            onClick={() => setActiveTab('password')}
            variant={activeTab === 'password' ? 'default' : 'outline'}
            size="sm"
            className="flex gap-2 bg-transparent whitespace-nowrap"
          >
            <Lock className="w-4 h-4" />
            Password
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        {activeTab === 'profile' ? (
          <div className="max-w-4xl">
            {/* Profile Picture Section */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
                  <img
                    src={profileData.picture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </Card>

            {/* Profile Information Form */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      placeholder="Enter your full address"
                      rows={3}
                      className="w-full pl-10 pt-3 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    />
                  </div>
                </div>

                {/* Message */}
                {profileMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    profileMessage.includes('successfully')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {profileMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setProfileData({
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+880 1700000000',
                        address: '123 Main Street, Dhaka, Bangladesh',
                        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                      })
                      setProfileMessage('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl">
            {/* Change Password Form */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Change Password</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Update your password to keep your account secure.
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your current password"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your new password"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm your new password"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Message */}
                {passwordMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    passwordMessage.includes('successfully')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {passwordMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      })
                      setPasswordMessage('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>

              {/* Security Tips */}
              <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Password Security Tips:</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use a mix of uppercase and lowercase letters</li>
                  <li>• Include numbers and special characters</li>
                  <li>• Avoid using personal information</li>
                  <li>• Don&apos;t reuse passwords from other accounts</li>
                </ul>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
