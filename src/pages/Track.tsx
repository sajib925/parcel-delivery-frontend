"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api"

export default function Track() {
  const [trackingId, setTrackingId] = useState("")
  const [searchId, setSearchId] = useState("")
  const { data: parcel, isFetching, error } = useGetParcelByTrackingIdQuery(searchId, {
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
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center md:text-left">
        Track Your Parcel
      </h1>
      <p className="text-gray-600 mb-8 text-center md:text-left">
        Enter your tracking ID below to get real-time updates about your shipment. 
        You can see the parcel status, sender, receiver, and estimated weight.
      </p>

      <div className="space-y-6">
        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            autoFocus
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            disabled={isFetching || !trackingId.trim()}
          >
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </div>

        {/* Feedback */}
        {isFetching && <p className="text-gray-500">Fetching parcel details...</p>}
        {error && <p className="text-red-500">Something went wrong. Please try again!</p>}
        {!isFetching && searchId && !parcel?.data && (
          <p className="text-red-500">No parcel found with ID "{searchId}"</p>
        )}

        {/* Parcel Details */}
        {parcel?.data && (
          <Card className="p-6 transition-opacity duration-500">
            <h2 className="text-2xl font-bold mb-4">Parcel Details</h2>
            <p className="text-gray-600 mb-2">
              Here’s the current information we have for your shipment:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <p>
                <strong>Tracking ID:</strong> {parcel.data.trackingId}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-white ${
                    parcel.data.status === "Delivered"
                      ? "bg-green-600"
                      : parcel.data.status === "In Transit"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                >
                  {parcel.data.status}
                </span>
              </p>
              <p>
                <strong>Weight:</strong> {parcel.data.weight} kg
              </p>
              <p>
                <strong>Sender:</strong> {parcel.data.senderName}
              </p>
              <p>
                <strong>Receiver:</strong> {parcel.data.receiverName}
              </p>
            </div>

            <p className="text-gray-500 mt-4 text-sm">
              *Note: Status updates may take a few minutes to reflect in our system.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
