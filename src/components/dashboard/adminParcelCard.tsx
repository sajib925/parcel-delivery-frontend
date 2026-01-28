'use client'

import { useState } from 'react'
import { Eye, Lock, Unlock, Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface AdminParcelCardProps {
  parcel: {
    id: string
    trackingId: string
    senderName: string
    receiverName: string
    status: string
    type: string
    weight: number
    fee: number
    isBlocked: boolean
    isCancelled: boolean
    createdAt: string
  }
  isSelected: boolean
  onToggleSelect: () => void
}

const statusColors: Record<string, string> = {
  Requested: 'bg-gray-100 text-gray-700',
  Approved: 'bg-blue-100 text-blue-700',
  'In Transit': 'bg-cyan-100 text-cyan-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Returned: 'bg-orange-100 text-orange-700',
}

export function AdminParcelCard({
  parcel,
  isSelected,
  onToggleSelect,
}: AdminParcelCardProps) {
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState(parcel.status)

  const handleStatusUpdate = () => {
    setUpdating(true)
    setTimeout(() => {
      setUpdating(false)
    }, 500)
  }

  return (
    <Card
      className={`p-4 lg:p-5 border transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 gap-4">
        {/* Checkbox */}
        <div className="lg:col-span-1 flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
        </div>

        {/* Tracking ID */}
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground lg:hidden font-semibold mb-1">
            Tracking ID
          </p>
          <p className="text-sm font-mono font-bold text-primary">
            {parcel.trackingId}
          </p>
        </div>

        {/* Sender */}
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground lg:hidden font-semibold mb-1">
            Sender
          </p>
          <p className="text-sm text-foreground font-medium">{parcel.senderName}</p>
          <p className="text-xs text-muted-foreground">{parcel.type}</p>
        </div>

        {/* Receiver */}
        <div className="lg:col-span-2">
          <p className="text-xs text-muted-foreground lg:hidden font-semibold mb-1">
            Receiver
          </p>
          <p className="text-sm text-foreground font-medium">{parcel.receiverName}</p>
          <p className="text-xs text-muted-foreground">{parcel.weight} kg</p>
        </div>

        {/* Status Selector */}
        <div className="lg:col-span-1">
          <p className="text-xs text-muted-foreground lg:hidden font-semibold mb-1">
            Status
          </p>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className={`w-full px-2 py-1 rounded text-xs font-semibold border border-input ${statusColors[newStatus]} bg-background`}
          >
            <option value="Requested">Requested</option>
            <option value="Approved">Approved</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        {/* Actions */}
        <div className="lg:col-span-2 flex gap-2">
          {newStatus !== parcel.status && (
            <Button
              size="sm"
              className="text-xs h-7 px-2"
              onClick={handleStatusUpdate}
              disabled={updating}
            >
              {updating ? (
                <Clock className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Check className="w-3 h-3 mr-1" />
              )}
              Update
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 bg-transparent"
            title="View details"
          >
            <Eye className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 bg-transparent"
            title={parcel.isBlocked ? 'Unblock parcel' : 'Block parcel'}
          >
            {parcel.isBlocked ? (
              <Unlock className="w-3 h-3 text-green-600" />
            ) : (
              <Lock className="w-3 h-3 text-amber-600" />
            )}
          </Button>
        </div>

        {/* Fee (mobile only) */}
        <div className="lg:col-span-1 lg:hidden">
          <p className="text-xs text-muted-foreground font-semibold mb-1">
            Fee
          </p>
          <p className="text-sm font-bold text-foreground">৳{parcel.fee}</p>
        </div>

        {/* Fee (desktop) */}
        <div className="hidden lg:flex lg:col-span-1 items-center">
          <p className="text-sm font-bold text-foreground">৳{parcel.fee}</p>
        </div>
      </div>
    </Card>
  )
}
