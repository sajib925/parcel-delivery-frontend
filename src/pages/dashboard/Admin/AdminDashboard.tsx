'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { useGetAllParcelsQuery } from '@/redux/features/parcel/parcel.api'
import { useGetAllUsersQuery } from '@/redux/features/user/user.api'
import {
  Package,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  BarChart3,
} from 'lucide-react'
import {
  LineChart,
  Line,
 
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']

export default function AdminDashboard() {
  const { data: parcelsData } = useGetAllParcelsQuery({
    page: 1,
    limit: 1000,
  })
  const { data: usersData } = useGetAllUsersQuery({
    page: 1,
    limit: 1000,
  })

  const [chartData, setChartData] = useState<any[]>([])
  const [parcelStatusData, setParcelStatusData] = useState<any[]>([])
  const [userRoleData, setUserRoleData] = useState<any[]>([])

  const parcels = parcelsData?.data?.result || []
  const users = usersData?.data?.result || []

  useEffect(() => {
    if (parcels.length > 0) {
      const statusCounts: Record<string, number> = {}

      parcels.forEach((parcel: any) => {
        const status = parcel.status?.toLowerCase() || 'unknown'
        statusCounts[status] = (statusCounts[status] || 0) + 1
      })

      const statusData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count,
        status,
      }))

      setParcelStatusData(statusData)

      const dailyData = [
        { day: 'Mon', parcels: 12, deliveries: 9 },
        { day: 'Tue', parcels: 18, deliveries: 14 },
        { day: 'Wed', parcels: 15, deliveries: 11 },
        { day: 'Thu', parcels: 24, deliveries: 19 },
        { day: 'Fri', parcels: 28, deliveries: 23 },
        { day: 'Sat', parcels: 20, deliveries: 16 },
        { day: 'Sun', parcels: 16, deliveries: 12 },
      ]
      setChartData(dailyData)
    }
  }, [parcels])

  useEffect(() => {
    if (users.length > 0) {
      const roleCounts: Record<string, number> = {}

      users.forEach((user: any) => {
        const role = user.role?.toLowerCase() || 'user'
        roleCounts[role] = (roleCounts[role] || 0) + 1
      })

      const roleData = Object.entries(roleCounts).map(([role, count]) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1),
        value: count,
      }))

      setUserRoleData(roleData)
    }
  }, [users])

  const activeUsers = users.filter((u: any) => !u.isBlocked)
  const blockedUsers = users.filter((u: any) => u.isBlocked)
  const deliveredParcels = parcels.filter(
    (p: any) => p.status?.toLowerCase() === 'delivered'
  )
  const pendingParcels = parcels.filter(
    (p: any) =>
      p.status?.toLowerCase() === 'pending' ||
      p.status?.toLowerCase() === 'processing'
  )

  const stats = [
    {
      icon: Package,
      label: 'Total Parcels',
      value: parcels.length,
      change: '+12%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: CheckCircle,
      label: 'Delivered',
      value: deliveredParcels.length,
      change: '+8%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: pendingParcels.length,
      change: '+15%',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      label: 'Total Users',
      value: users.length,
      change: '+5%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      label: 'Active Users',
      value: activeUsers.length,
      change: '+3%',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: AlertCircle,
      label: 'Blocked Users',
      value: blockedUsers.length,
      change: '-2%',
      color: 'from-red-500 to-rose-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your system overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="bg-card border border-border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {stat.label}
                    </p>
                    <h2 className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </h2>
                    <p className="text-xs text-green-500 mt-2">{stat.change}</p>
                  </div>
                  <div
                    className={`bg-linear-to-br ${stat.color} p-3 rounded-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Activity Chart */}
          <Card className="bg-card border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Daily Activity
              </h3>
              <p className="text-sm text-muted-foreground">
                Parcels and deliveries per day
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #2d3748',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e8ecf1' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="parcels"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Parcel Status Distribution */}
          <Card className="bg-card border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Parcel Status
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribution across statuses
              </p>
            </div>
            {parcelStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={parcelStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {parcelStatusData.map((index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f2e',
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#e8ecf1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-72 flex items-center justify-center text-muted-foreground">
                Loading chart...
              </div>
            )}
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Roles Distribution */}
          <Card className="bg-card border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              User Roles
            </h3>
            <div className="space-y-4">
              {userRoleData.length > 0 ? (
                userRoleData.map((role, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-foreground">{role.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {role.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">Loading...</p>
              )}
            </div>
          </Card>

          {/* System Stats */}
          <Card className="bg-card border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              System Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Server Load</span>
                  <span className="text-sm font-semibold text-green-500">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Database Load</span>
                  <span className="text-sm font-semibold text-cyan-500">62%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">API Response Time</span>
                  <span className="text-sm font-semibold text-blue-500">
                    125ms
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="bg-card border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Parcels
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Parcel ID
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Created
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcels.slice(0, 5).map((parcel: any, ) => (
                  <tr key={parcel.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground font-mono text-xs">
                      #{parcel.trackingId || parcel._id?.substring(0, 8)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          parcel.status?.toLowerCase() === 'delivered'
                            ? 'bg-green-500/20 text-green-400'
                            : parcel.status?.toLowerCase() === 'pending'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {parcel.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {parcel.createdAt
                        ? new Date(parcel.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-foreground font-semibold">
                      ৳{parcel.weight || '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
