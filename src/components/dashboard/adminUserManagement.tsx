'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Lock, Unlock } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTablePagination,
  DataTableRow,
} from '../ui/data-table'

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useToggleBlockUserMutation,
} from '@/redux/features/user/user.api'

/* =====================
   TYPES
===================== */

export interface IUser {
  _id: string
  name: string
  email: string
  role: 'admin' | 'sender' | 'receiver'
  isBlocked: boolean
  createdAt: string
}

interface IUserApiResponse {
  success: boolean
  data: IUser[]
}

/* =====================
   COMPONENT
===================== */

export function AdminUserManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const [sortKey, setSortKey] = useState<'name' | 'email'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const [selectedRole, setSelectedRole] =
    useState<'all' | 'sender' | 'receiver'>('all')

  /* =====================
     API
  ===================== */

  const { data, isLoading, refetch } =
    useGetAllUsersQuery(undefined)

  const users: IUser[] =
    (data as IUserApiResponse)?.data ?? []

  const [toggleBlockUser] = useToggleBlockUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  /* =====================
     FILTER + SORT
  ===================== */

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (u) => selectedRole === 'all' || u.role === selectedRole
      )
      .filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const A = a[sortKey].toLowerCase()
        const B = b[sortKey].toLowerCase()
        if (A < B) return sortDir === 'asc' ? -1 : 1
        if (A > B) return sortDir === 'asc' ? 1 : -1
        return 0
      })
  }, [users, selectedRole, searchQuery, sortKey, sortDir])

  /* =====================
     PAGINATION
  ===================== */

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredUsers.slice(start, start + pageSize)
  }, [filteredUsers, page, pageSize])

  /* =====================
     HELPERS
  ===================== */

  const getRoleColor = (role: IUser['role']) => {
    if (role === 'admin') return 'bg-purple-100 text-purple-800'
    if (role === 'sender') return 'bg-blue-100 text-blue-800'
    return 'bg-green-100 text-green-800'
  }

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="w-full p-4 space-y-4">
      {/* Filters */}
      <div className="flex gap-2 items-center">
        {['all', 'sender', 'receiver'].map((role) => (
          <Button
            key={role}
            size="sm"
            variant={selectedRole === role ? 'default' : 'outline'}
            onClick={() =>
              setSelectedRole(role as 'all' | 'sender' | 'receiver')
            }
          >
            {role === 'all'
              ? 'All Users'
              : role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        ))}

        <input
          className="ml-auto px-3 py-2 border rounded-md"
          placeholder="Search name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <DataTable>
        <DataTableHeader>
          <DataTableRow>
            <DataTableHead
              className="cursor-pointer"
              onClick={() => {
                setSortKey('name')
                setSortDir((p) => (p === 'asc' ? 'desc' : 'asc'))
              }}
            >
              Name
            </DataTableHead>

            <DataTableHead
              className="cursor-pointer"
              onClick={() => {
                setSortKey('email')
                setSortDir((p) => (p === 'asc' ? 'desc' : 'asc'))
              }}
            >
              Email
            </DataTableHead>

            <DataTableHead>Role</DataTableHead>
            <DataTableHead>Status</DataTableHead>
            <DataTableHead>Actions</DataTableHead>
          </DataTableRow>
        </DataTableHeader>

        <DataTableBody>
          {isLoading ? (
            <DataTableRow>
              <DataTableCell colSpan={5} className="text-center">
                Loading...
              </DataTableCell>
            </DataTableRow>
          ) : pagedUsers.length === 0 ? (
            <DataTableRow>
              <DataTableCell colSpan={5} className="text-center">
                No users found
              </DataTableCell>
            </DataTableRow>
          ) : (
            pagedUsers.map((user) => (
              <DataTableRow key={user._id}>
                <DataTableCell>{user.name}</DataTableCell>
                <DataTableCell>{user.email}</DataTableCell>

                <DataTableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </DataTableCell>

                <DataTableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isBlocked
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </DataTableCell>

                <DataTableCell className="flex gap-2">
                  {/* BLOCK / UNBLOCK */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        {user.isBlocked ? (
                          <Unlock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {user.isBlocked ? 'Unblock user?' : 'Block user?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to{' '}
                          {user.isBlocked ? 'unblock' : 'block'} this user?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await toggleBlockUser(user._id).unwrap()
                            refetch()
                          }}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* DELETE */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete user?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={async () => {
                            await deleteUser(user._id).unwrap()
                            refetch()
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>

        <DataTablePagination
          page={page}
          pageSize={pageSize}
          total={filteredUsers.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </DataTable>
    </div>
  )
}
