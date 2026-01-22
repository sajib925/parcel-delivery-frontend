"use client"

import { useState } from "react"
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api"
import AdminParcelsList from "@/components/modules/parcel/AdminParcelsList"

export default function AdminParcels() {
  const [page, setPage] = useState(1)
  const { data: parcelsData, isLoading } = useGetAllParcelsQuery({ page, limit: 10 })

  const parcels = parcelsData?.data?.result || []
  const totalPages = parcelsData?.data?.totalPages || 1

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">All Parcels</h1>
      <AdminParcelsList parcels={parcels} isLoading={isLoading} />

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded ${page === p ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
