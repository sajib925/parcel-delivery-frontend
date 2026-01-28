'use client'

import { useState } from 'react'
import { Trash2, Lock, Unlock, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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

interface UserTableRowProps {
  user: IUser
  isSelected: boolean
  onToggleSelect: () => void
  onToggleBlock: () => void
  onDelete: () => void
  loading: boolean
}

export function UserTableRow({
  user,
  isSelected,
  onToggleSelect,
  onToggleBlock,
  onDelete,
  loading,
}: UserTableRowProps) {
  const [expanded, setExpanded] = useState(false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'sender':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'receiver':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  // Desktop View
  const desktopView = (
    <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-4 py-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded border-border cursor-pointer"
          disabled={loading}
        />
      </div>
      <div className="col-span-3">
        <p className="font-medium text-foreground text-sm">{user.name}</p>
        {user.address && <p className="text-xs text-muted-foreground">{user.address}</p>}
      </div>
      <div className="col-span-3">
        <p className="text-sm text-foreground">{user.email}</p>
        {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
      </div>
      <div className="col-span-1">
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRoleColor(user.role)}`}>
          {getRoleLabel(user.role)}
        </span>
      </div>
      <div className="col-span-1">
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
          user.isBlocked
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {user.isBlocked ? 'Blocked' : 'Active'}
        </span>
      </div>
      <div className="col-span-2 flex gap-2 justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleBlock}
          disabled={loading}
          title={user.isBlocked ? 'Unblock user' : 'Block user'}
          className="bg-transparent"
        >
          {user.isBlocked ? (
            <Unlock className="w-4 h-4" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={onDelete}
          disabled={loading}
          title="Delete user"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  // Mobile View
  const mobileView = (
    <Card className={`p-4 border ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded border-border cursor-pointer mt-1"
          disabled={loading}
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {expanded && (
        <div className="space-y-3 border-t border-border pt-3">
          {user.address && (
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Address:</span> {user.address}
            </p>
          )}
          {user.phone && (
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Phone:</span> {user.phone}
            </p>
          )}
          <div className="flex gap-2 flex-wrap">
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRoleColor(user.role)}`}>
              {getRoleLabel(user.role)}
            </span>
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              user.isBlocked
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {user.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onToggleBlock}
              disabled={loading}
              className="flex-1 bg-transparent text-xs"
            >
              {user.isBlocked ? (
                <>
                  <Unlock className="w-3 h-3 mr-1" />
                  Unblock
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 mr-1" />
                  Block
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
              className="flex-1 text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  )

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  )
}
