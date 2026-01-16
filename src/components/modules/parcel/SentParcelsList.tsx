"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCancelParcelMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"

interface Parcel {
  id: string
  trackingId: string
  receiverName: string
  receiverPhone: string
  weight: number
  cost: number
  status: string
}

export default function SentParcelsList({ parcels, isLoading }: { parcels: Parcel[]; isLoading: boolean }) {
  const [cancelParcel] = useCancelParcelMutation()

  const handleCancel = async (parcelId: string) => {
    try {
      await cancelParcel(parcelId).unwrap()
      toast.success("Parcel cancelled successfully")
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to cancel parcel")
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (parcels.length === 0) return <div className="text-center py-8">No parcels found</div>

  return (
    <div className="space-y-4">
      {parcels.map((parcel: any) => (
        <Card key={parcel.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg">Tracking: {parcel.trackingId}</h3>
              <p className="text-sm text-gray-600">To: {parcel.receiverName}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>Weight: {parcel.weight}kg</p>
                <p>Cost: ${parcel.cost}</p>
                <p>
                  Status: <span className="font-semibold capitalize">{parcel.status}</span>
                </p>
              </div>
            </div>
            {parcel.status === "pending" && (
              <Button variant="destructive" onClick={() => handleCancel(parcel.id)} size="sm">
                Cancel
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
