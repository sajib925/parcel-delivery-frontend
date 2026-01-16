"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToggleBlockUserMutation, useDeleteUserMutation } from "@/redux/features/user/user.api"
import { toast } from "sonner"

export default function AdminUsersList({ users, isLoading }: { users: any[]; isLoading: boolean }) {
  const [toggleBlock] = useToggleBlockUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleToggleBlock = async (userId: string) => {
    try {
      await toggleBlock(userId).unwrap()
      toast.success("User block status updated")
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update user")
    }
  }

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap()
        toast.success("User deleted successfully")
      } catch (error: any) {
        toast.error(error.data?.message || "Failed to delete user")
      }
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (users.length === 0) return <div className="text-center py-8">No users found</div>

  return (
    <div className="space-y-4">
      {users.map((user: any) => (
        <Card key={user.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  Role: <span className="font-semibold capitalize">{user.role}</span>
                </p>
                <p>
                  Status:{" "}
                  <span className={`font-semibold ${user.isBlocked ? "text-red-600" : "text-green-600"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleToggleBlock(user.id)}
                size="sm"
                variant={user.isBlocked ? "default" : "destructive"}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </Button>
              <Button onClick={() => handleDelete(user.id)} size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
