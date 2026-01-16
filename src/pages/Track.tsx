"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useGetParcelByTrackingIdQuery } from "@/redux/features/parcel/parcel.api"
import { Card } from "@/components/ui/card"

export default function Track() {
  const [trackingId, setTrackingId] = useState("")
  const [searchId, setSearchId] = useState("")
  const { data: parcel, isFetching } = useGetParcelByTrackingIdQuery(searchId, {
    skip: !searchId,
  })

  const handleSearch = () => {
    if (trackingId.trim()) {
      setSearchId(trackingId)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Track Your Parcel</h1>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isFetching}>
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </div>

        {parcel?.data && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Parcel Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Tracking ID:</strong> {parcel.data.trackingId}
              </p>
              <p>
                <strong>Status:</strong> {parcel.data.status}
              </p>
              <p>
                <strong>Weight:</strong> {parcel.data.weight}kg
              </p>
              <p>
                <strong>Sender:</strong> {parcel.data.senderName}
              </p>
              <p>
                <strong>Receiver:</strong> {parcel.data.receiverName}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
