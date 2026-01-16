"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUpdateParcelStatusMutation, useBlockParcelMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"
import UpdateParcelStatusModal from "../UpdateParcelStatusModal"

export default function AdminParcelsList({ parcels, isLoading }: { parcels: any[]; isLoading: boolean }) {
  const [selectedParcel, setSelectedParcel] = useState<any>(null)
  const [updateStatus] = useUpdateParcelStatusMutation()
  const [blockParcel] = useBlockParcelMutation()

  const handleBlock = async (parcelId: string) => {
    try {
      await blockParcel(parcelId).unwrap()
      toast.success("Parcel blocked successfully")
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to block parcel")
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (parcels.length === 0) return <div className="text-center py-8">No parcels found</div>

  return (
    <>
      <div className="space-y-4">
        {parcels.map((parcel: any) => (
          <Card key={parcel.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Tracking: {parcel.trackingId}</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Sender: {parcel.senderName}</p>
                  <p>Receiver: {parcel.receiverName}</p>
                  <p>Weight: {parcel.weight}kg</p>
                  <p>
                    Status: <span className="font-semibold capitalize">{parcel.status}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setSelectedParcel(parcel)} size="sm" variant="outline">
                  Update Status
                </Button>
                <Button onClick={() => handleBlock(parcel.id)} size="sm" variant="destructive">
                  Block
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedParcel && (
        <UpdateParcelStatusModal
          parcel={selectedParcel}
          open={!!selectedParcel}
          onOpenChange={(open) => !open && setSelectedParcel(null)}
        />
      )}
    </>
  )
}
