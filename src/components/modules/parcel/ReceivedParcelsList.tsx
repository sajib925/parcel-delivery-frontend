"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useConfirmDeliveryMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"

interface Parcel {
  id: string
  trackingId: string
  senderName: string
  weight: number
  cost: number
  status: string
}

export default function ReceivedParcelsList({ parcels, isLoading }: { parcels: Parcel[]; isLoading: boolean }) {
  const [confirmDelivery] = useConfirmDeliveryMutation()

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmDelivery(parcelId).unwrap()
      toast.success("Delivery confirmed successfully")
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to confirm delivery")
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
              <p className="text-sm text-gray-600">From: {parcel.senderName}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>Weight: {parcel.weight}kg</p>
                <p>Paid Amount: ${parcel.cost}</p>
                <p>
                  Status: <span className="font-semibold capitalize">{parcel.status}</span>
                </p>
              </div>
            </div>
            {parcel.status !== "delivered" && (
              <Button onClick={() => handleConfirm(parcel.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                Confirm Delivery
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
