import DashboardSkeleton from "@/components/DashboardSkeleton"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { TRole } from "@/types"
import { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (
  Component: ComponentType,
  requiredRole?: TRole
) => {
  return function AuthWrapper() {
    const { data, isLoading, isError } = useUserInfoQuery(undefined)


    if (isLoading) {
      return <DashboardSkeleton />
    }

    if (isError || !data?.data) {
      return <Navigate to="/login" replace />
    }

    const userRole = data.data.role?.toUpperCase() as TRole

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />
    }

    return <Component />
  }
}
