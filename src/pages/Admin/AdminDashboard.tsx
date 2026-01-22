"use client"

import { Card } from "@/components/ui/card"
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api"
import { useGetAllUsersQuery } from "@/redux/features/user/user.api"

export default function AdminDashboard() {
  const { data: parcelsData } = useGetAllParcelsQuery({ page: 1, limit: 100 })
  const { data: usersData } = useGetAllUsersQuery({ page: 1, limit: 100 })

  const parcels = parcelsData?.data?.result || []
  const users = usersData?.data?.result || []

  const stats = {
    totalParcels: parcels.length,
    totalUsers: users.length,
    delivered: parcels.filter((p: any) => p.status === "delivered").length,
    activeUsers: users.filter((u: any) => !u.isBlocked).length,
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total Parcels", value: stats.totalParcels },
          { label: "Total Users", value: stats.totalUsers },
          { label: "Delivered", value: stats.delivered },
          { label: "Active Users", value: stats.activeUsers },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Parcel Status Distribution</h2>
          <div className="space-y-2">
            {["pending", "in-transit", "delivered"].map((status) => (
              <div key={status} className="flex justify-between">
                <span className="capitalize">{status}</span>
                <span className="font-semibold">{parcels.filter((p: any) => p.status === status).length}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">User Roles</h2>
          <div className="space-y-2">
            {["sender", "receiver", "admin"].map((role) => (
              <div key={role} className="flex justify-between">
                <span className="capitalize">{role}</span>
                <span className="font-semibold">{users.filter((u: any) => u.role.toLowerCase() === role).length}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
