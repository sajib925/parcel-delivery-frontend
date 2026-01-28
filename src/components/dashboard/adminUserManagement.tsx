'use client'

import { useState } from 'react'
import { Menu, Trash2, User, AlertCircle, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UserTableRow } from './userTableRow'



interface IUser {
  _id: string
  name: string
  email: string
  role: 'admin' | 'sender' | 'receiver'
  phone?: string
  address?: string
  picture?: string
  isBlocked: boolean
  createdAt: string
}

const mockUsers: IUser[] = [
  {
    _id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'sender',
    phone: '+1234567890',
    address: '123 Main St, NY',
    isBlocked: false,
    createdAt: '2024-01-15',
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'receiver',
    phone: '+1234567891',
    address: '456 Oak Ave, LA',
    isBlocked: false,
    createdAt: '2024-01-16',
  },
  {
    _id: '3',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'sender',
    phone: '+1234567892',
    address: '789 Elm St, TX',
    isBlocked: true,
    createdAt: '2024-01-17',
  },
  {
    _id: '4',
    name: 'Jane Williams',
    email: 'jane@example.com',
    role: 'receiver',
    phone: '+1234567893',
    address: '321 Pine Rd, FL',
    isBlocked: false,
    createdAt: '2024-01-18',
  },
  {
    _id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'sender',
    phone: '+1234567894',
    address: '654 Maple Dr, WA',
    isBlocked: false,
    createdAt: '2024-01-19',
  },
  {
    _id: '6',
    name: 'Eve Davis',
    email: 'eve@example.com',
    role: 'receiver',
    phone: '+1234567895',
    address: '987 Cedar Ln, CA',
    isBlocked: false,
    createdAt: '2024-01-20',
  },
]

const userStats = [
  {
    label: 'Total Users',
    value: '48',
    change: '+5 this week',
    icon: User,
    color: 'text-blue-600',
  },
  {
    label: 'Active Senders',
    value: '28',
    change: '+2 this week',
    icon: User,
    color: 'text-green-600',
  },
  {
    label: 'Active Receivers',
    value: '18',
    change: '+3 this week',
    icon: User,
    color: 'text-cyan-600',
  },
  {
    label: 'Blocked Users',
    value: '2',
    change: '1 pending review',
    icon: AlertCircle,
    color: 'text-red-600',
  },
]

export function AdminUserManagement() {
  const [users, setUsers] = useState<IUser[]>(mockUsers)
  const [selectedRole, setSelectedRole] = useState<'all' | 'sender' | 'receiver'>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // Filter users based on role and search
  const filteredUsers = users.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesSearch
  })

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u._id))
    }
  }

  const handleToggleBlock = async (userId: string) => {
    try {
      setLoading(true)
      // Call API: PATCH /api/users/:userId/toggle-block
      const response = await fetch(`/api/users/${userId}/toggle-block`, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        setUsers(users.map(user =>
          user._id === userId
            ? { ...user, isBlocked: !user.isBlocked }
            : user
        ))
      }
    } catch (error) {
      console.error('Error toggling block status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      setLoading(true)
      // Call API: DELETE /api/users/:userId
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId))
        setSelectedUsers(selectedUsers.filter(id => id !== userId))
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage users and their roles</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-transparent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div> */}

        {/* Search and Filter */}
        <div className="bg-card p-4 rounded-lg border border-border space-y-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Role Tabs */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setSelectedRole('all')}
              variant={selectedRole === 'all' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              All Users
            </Button>
            <Button
              onClick={() => setSelectedRole('sender')}
              variant={selectedRole === 'sender' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              Senders
            </Button>
            <Button
              onClick={() => setSelectedRole('receiver')}
              variant={selectedRole === 'receiver' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              Receivers
            </Button>
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between py-2 px-4 bg-secondary rounded-lg border border-border">
              <span className="text-sm text-foreground font-medium">
                {selectedUsers.length} selected
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={loading}
                  onClick={() => {
                    selectedUsers.forEach(id => handleDeleteUser(id))
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table/List */}
        <div className="space-y-3">
          {/* Header row for desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 bg-secondary rounded-lg border border-border">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
            </div>
            <div className="col-span-3 text-xs font-semibold text-foreground">Name</div>
            <div className="col-span-3 text-xs font-semibold text-foreground">Email</div>
            <div className="col-span-1 text-xs font-semibold text-foreground">Role</div>
            <div className="col-span-1 text-xs font-semibold text-foreground">Status</div>
            <div className="col-span-2 text-xs font-semibold text-foreground text-right">Actions</div>
          </div>

          {/* User items */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <UserTableRow
                key={user._id}
                user={user}
                isSelected={selectedUsers.includes(user._id)}
                onToggleSelect={() => toggleUserSelection(user._id)}
                onToggleBlock={() => handleToggleBlock(user._id)}
                onDelete={() => handleDeleteUser(user._id)}
                loading={loading}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
