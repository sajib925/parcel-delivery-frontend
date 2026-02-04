"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api"

export default function Track() {
  const [trackingId, setTrackingId] = useState("")
  const [searchId, setSearchId] = useState("")

  const { data: parcel, isFetching, error } =
    useGetParcelByTrackingIdQuery(searchId, {
      skip: !searchId,
    })

  const handleSearch = () => {
    const trimmedId = trackingId.trim()
    if (!trimmedId) return
    if (trimmedId.length < 5) {
      alert("Tracking ID should be at least 5 characters")
      return
    }
    setSearchId(trimmedId)
  }

  return (
    <section className=" bg-gray-50 pt-30 lg:pt-40 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Track Your Parcel
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enter your tracking ID to view real-time parcel status, sender,
            receiver details, and shipment weight.
          </p>
        </div>

        {/* Search Card */}
        <Card className="p-6 md:p-8 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              autoFocus
              placeholder="Enter tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="text-lg"
            />

            <Button
              onClick={handleSearch}
              disabled={isFetching || !trackingId.trim()}
              className="px-8"
            >
              {isFetching ? "Tracking..." : "Track Parcel"}
            </Button>
          </div>

          {/* Helper text */}
          <p className="text-sm text-gray-500 mt-3">
            Example: TRK-98234
          </p>
        </Card>

        {/* Loading */}
        {isFetching && (
          <p className="text-center text-gray-500 animate-pulse">
            Fetching parcel details...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Not Found */}
        {!isFetching && searchId && !parcel?.data && (
          <p className="text-center text-red-500">
            No parcel found with ID "{searchId}"
          </p>
        )}

        {/* Parcel Details */}
        {parcel?.data && (
          <Card className="p-6 md:p-8 shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Parcel Details</h2>
            <p className="text-gray-600 mb-6">
              Here’s the latest information about your shipment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Info label="Tracking ID" value={parcel.data.trackingId} />

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    parcel.data.status === "Delivered"
                      ? "bg-green-600"
                      : parcel.data.status === "In Transit"
                      ? "bg-blue-600"
                      : "bg-gray-500"
                  }`}
                >
                  {parcel.data.status}
                </span>
              </div>

              <Info label="Weight" value={`${parcel.data.weight} kg`} />
              <Info label="Sender" value={parcel.data.senderName} />
              <Info label="Receiver" value={parcel.data.receiverName} />
            </div>

            <p className="text-gray-500 mt-6 text-sm">
              * Status updates may take a few minutes to reflect in the system.
            </p>
          </Card>
        )}
      </div>
    </section>
  )
}

/* Small helper component */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  )
}
