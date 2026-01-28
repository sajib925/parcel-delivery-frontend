'use client'

import { Eye, Trash2, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type LucideIcon } from 'lucide-react'

interface ParcelCardProps {
  parcel: {
    id: string
    trackingId: string
    receiverName?: string
    senderName?: string
    receiverAddress?: string
    senderAddress?: string
    status: string
    type: string
    weight: number
    fee: number
    estimatedDeliveryDate?: string
    createdAt: string
  }
  role: 'sender' | 'receiver'
  statusConfig: Record<string, { color: string; bgColor: string; icon: LucideIcon }>
}

export function ParcelCard({ parcel, role, statusConfig }: ParcelCardProps) {
  const config = statusConfig[parcel.status] || statusConfig['Requested']
  const StatusIcon = config.icon

  const isReceiver = role === 'receiver'
  const displayName = isReceiver ? parcel.senderName : parcel.receiverName
  const displayAddress = isReceiver ? parcel.senderAddress : parcel.receiverAddress

  return (
    <Card className="p-4 lg:p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left section */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-mono font-bold text-primary">
                {parcel.trackingId}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {displayName} • {displayAddress}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="text-xs">
              <span className="text-muted-foreground">Type: </span>
              <span className="font-medium text-foreground">{parcel.type}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Weight: </span>
              <span className="font-medium text-foreground">{parcel.weight} kg</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Fee: </span>
              <span className="font-medium text-foreground">৳{parcel.fee}</span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-between lg:justify-end gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
            <StatusIcon className={`w-4 h-4 ${config.color}`} />
            <span className={`text-xs font-semibold ${config.color}`}>
              {parcel.status}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              title="View details"
            >
              <Eye className="w-4 h-4" />
            </Button>

            {role === 'sender' && parcel.status === 'Approved' && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-transparent"
                title="Cancel parcel"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            )}

            {role === 'receiver' && parcel.status === 'Out for Delivery' && (
              <Button
                size="sm"
                variant="default"
                className="h-8 px-3"
                title="Confirm delivery"
              >
                <RotateCw className="w-4 h-4 mr-1" />
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
