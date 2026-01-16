import { Card } from "@/components/ui/card"

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-sm font-medium text-gray-600">Your Role</h2>
          <p className="text-2xl font-bold mt-2 capitalize">{user.role}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-sm font-medium text-gray-600">Account Status</h2>
          <p className="text-2xl font-bold mt-2">{user.isBlocked ? "Blocked" : "Active"}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-sm font-medium text-gray-600">Member Since</h2>
          <p className="text-2xl font-bold mt-2">{new Date(user.createdAt).getFullYear()}</p>
        </Card>
      </div>
    </div>
  )
}
