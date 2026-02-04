'use client'

import { useState } from 'react'
import { Eye, Lock, Unlock, Check, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminParcel } from '@/types'

interface AdminParcelCardProps {
  parcel: AdminParcel
  isSelected: boolean
  onToggleSelect: () => void

  // ✅ Admin actions
  onUpdateStatus?: (parcelId: string, status: string) => Promise<void>
  onBlock?: (parcelId: string) => Promise<void>
  onCancel?: (parcelId: string) => Promise<void>
  onConfirmDelivery?: (parcelId: string) => Promise<void>
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
  onUpdateStatus,
  onBlock,
  onCancel,
  onConfirmDelivery,
}: AdminParcelCardProps) {
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState(parcel.status)
  const [blocking, setBlocking] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [confirming, setConfirming] = useState(false)

  // 🔹 Handlers
  const handleStatusUpdate = async () => {
    if (!onUpdateStatus) return
    setUpdating(true)
    await onUpdateStatus(parcel.id, newStatus)
    setUpdating(false)
  }

  const handleBlockToggle = async () => {
    if (!onBlock) return
    setBlocking(true)
    await onBlock(parcel.id)
    setBlocking(false)
  }

  const handleCancel = async () => {
    if (!onCancel) return
    setCancelling(true)
    await onCancel(parcel.id)
    setCancelling(false)
  }

  const handleConfirmDelivery = async () => {
    if (!onConfirmDelivery) return
    setConfirming(true)
    await onConfirmDelivery(parcel.id)
    setConfirming(false)
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
          <p className="text-sm font-mono font-bold text-primary">
            {parcel.trackingId}
          </p>
        </div>

        {/* Sender */}
        <div className="lg:col-span-2">
          <p className="text-sm font-medium">{parcel.senderName}</p>
          <p className="text-xs text-muted-foreground">{parcel.type}</p>
        </div>

        {/* Receiver */}
        <div className="lg:col-span-2">
          <p className="text-sm font-medium">{parcel.receiverName}</p>
          <p className="text-xs text-muted-foreground">{parcel.weight} kg</p>
        </div>

        {/* Status */}
        <div className="lg:col-span-1">
          <select
            value={newStatus}
            onChange={e => setNewStatus(e.target.value)}
            className={`w-full px-2 py-1 rounded text-xs font-semibold border ${statusColors[newStatus]}`}
          >
            {Object.keys(statusColors).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="lg:col-span-2 flex gap-2 flex-wrap">
          {/* Update Status */}
          {newStatus !== parcel.status && (
            <Button
              size="sm"
              className="h-7 px-2 text-xs"
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

          {/* View */}
          <Button size="sm" variant="outline" className="h-7 px-2">
            <Eye className="w-3 h-3" />
          </Button>

          {/* Block / Unblock */}
          <Button
            size="sm"
            variant={parcel.isBlocked ? 'default' : 'destructive'}
            className="h-7 px-2"
            onClick={handleBlockToggle}
            disabled={blocking}
          >
            {blocking ? (
              <Clock className="w-3 h-3 mr-1 animate-spin" />
            ) : parcel.isBlocked ? (
              <Unlock className="w-3 h-3 text-green-600" />
            ) : (
              <Lock className="w-3 h-3 text-amber-600" />
            )}
          </Button>

          {/* Cancel */}
          <Button
            size="sm"
            variant="destructive"
            className="h-7 px-2"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? (
              <Clock className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
          </Button>

          {/* Confirm Delivery */}
          <Button
            size="sm"
            className="h-7 px-2"
            onClick={handleConfirmDelivery}
            disabled={confirming}
          >
            {confirming ? (
              <Clock className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Check className="w-3 h-3 mr-1" />
            )}
            Confirm
          </Button>
        </div>

        {/* Fee */}
        <div className="lg:col-span-1 flex items-center">
          <p className="text-sm font-bold">৳{parcel.fee}</p>
        </div>
      </div>
    </Card>
  )
}
