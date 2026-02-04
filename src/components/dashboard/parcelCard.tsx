'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useConfirmDeliveryMutation, useCancelParcelMutation } from '@/redux/features/parcel/parcel.api'
import { Package } from 'lucide-react'
import { toast } from 'sonner'
import { ParcelStatus } from '@/types'

interface ParcelCardProps {
  parcel: any
  role: 'sender' | 'receiver' | 'admin'
  statusConfig: Record<string, any>
}

export function ParcelCard({ parcel, role, statusConfig }: ParcelCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const [confirmDelivery] = useConfirmDeliveryMutation()
  const [cancelParcel] = useCancelParcelMutation()

  // Get status info from statusConfig
  const statusInfo = statusConfig[parcel.currentStatus] || statusConfig['Requested']
  const Icon = statusInfo.icon
  const statusLabel = statusInfo.label || parcel.currentStatus

  /* ================= HANDLERS ================= */
  const handleConfirmDelivery = async () => {
    try {
      await confirmDelivery(parcel._id).unwrap()
      toast.success('Delivery confirmed successfully')
      setShowConfirmDialog(false)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to confirm delivery')
    }
  }

  const handleCancelParcel = async () => {
    try {
      await cancelParcel(parcel._id).unwrap()
      toast.success('Parcel cancelled successfully')
      setShowCancelDialog(false)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel parcel')
    }
  }

  return (
    <>
      <Card className="bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 truncate">{parcel.trackingId}</h3>
              </div>

              {/* Status Badge */}
              
            </div>

            {/* Status Icon */}
            <div className="flex gap-2">
              <Badge className={`${statusInfo.bgColor} ${statusInfo.color} border-0 text-xs font-semibold`}>
                {statusLabel}
              </Badge>
               <Icon className={`h-6 w-6 ${statusInfo.color}`} />
            </div>
            
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* From Info */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">FROM</p>
              <p className="text-sm font-semibold text-slate-900">{parcel.senderName || 'Unknown Sender'}</p>
              <p className="text-xs text-slate-500 mt-1">{parcel.senderAddress || 'N/A'}</p>
            </div>

            {/* To Info */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">TO</p>
              <p className="text-sm font-semibold text-slate-900">{parcel.receiverName || 'Unknown Receiver'}</p>
              <p className="text-xs text-slate-500 mt-1">{parcel.receiverAddress || 'N/A'}</p>
            </div>
          </div>

          {/* Parcel Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Weight</p>
              <p className="text-sm font-semibold text-slate-900">{parcel.weight || 'N/A'} kg</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Size</p>
              <p className="text-sm font-semibold text-slate-900">{parcel.size || 'Standard'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Created</p>
              <p className="text-sm font-semibold text-slate-900">
                {parcel.createdAt ? new Date(parcel.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Estimated</p>
              <p className="text-sm font-semibold text-slate-900">
                {parcel.estimatedDelivery ? new Date(parcel.estimatedDelivery).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Description */}
          {parcel.description && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium mb-1">Description</p>
              <p className="text-sm text-blue-900">{parcel.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
            {/* Sender Actions */}
            {role === 'sender' && parcel.currentStatus !== ParcelStatus.CANCELLED && parcel.currentStatus !== ParcelStatus.DELIVERED && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelDialog(true)}
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Cancel
              </Button>
            )}

            {/* Receiver Actions */}
            {role === 'receiver' && parcel.currentStatus === ParcelStatus.OUT_FOR_DELIVERY && (
              <Button
                size="sm"
                onClick={() => setShowConfirmDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirm Delivery
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Confirm Delivery Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm that you have received this parcel? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-4">
            <p className="text-sm text-blue-900">
              <strong>Tracking ID:</strong> {parcel.trackingId}
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelivery} className="bg-blue-600 hover:bg-blue-700">
              Confirm
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Parcel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Parcel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this parcel shipment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 my-4">
            <p className="text-sm text-red-900">
              <strong>Tracking ID:</strong> {parcel.trackingId}
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelParcel} className="bg-red-600 hover:bg-red-700">
              Cancel Parcel
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
