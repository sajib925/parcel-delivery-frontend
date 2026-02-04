'use client'

import { useState } from 'react'
import {
  FileText,
  Check,
  Clock,
  X,
  Truck,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  useGetReceivedParcelsQuery,
  useConfirmDeliveryMutation,
} from '@/redux/features/parcel/parcel.api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { ParcelCard } from './parcelCard'
import { ParcelStatus } from '@/types'

/* ================= STATUS CONFIG ================= */
const statusConfig: Record<
  ParcelStatus,
  {
    color: string
    bgColor: string
    icon: any
    label?: string
  }
> = {
  [ParcelStatus.REQUESTED]: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    icon: Clock,
  },
  [ParcelStatus.APPROVED]: {
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    icon: Check,
  },
  [ParcelStatus.DISPATCHED]: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: Truck,
  },
  [ParcelStatus.IN_TRANSIT]: {
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    icon: Truck,
  },
  [ParcelStatus.OUT_FOR_DELIVERY]: {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    icon: Clock,
  },
  [ParcelStatus.DELIVERED]: {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: Check,
    label: 'Received', // ✅ Receiver wording
  },
  [ParcelStatus.CANCELLED]: {
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: X,
  },
  [ParcelStatus.RETURNED]: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: ArrowDownLeft,
  },
}

/* ================= COMPONENT ================= */
export function ReceiverDashboardComponents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showBulkReceiveDialog, setShowBulkReceiveDialog] = useState(false)

  const { data, isLoading } = useGetReceivedParcelsQuery(undefined)
  const [confirmParcel] = useConfirmDeliveryMutation()

  const parcels = data?.data || []


  // Pending parcels include REQUESTED and OUT_FOR_DELIVERY
  const pendingParcels = parcels.filter(
    (p: any) =>
      p.currentStatus === ParcelStatus.OUT_FOR_DELIVERY 
  )

  const filteredParcels = parcels.filter((p: any) =>
    p.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.senderName?.toLowerCase().includes(searchQuery.toLowerCase())
  )


  /* ================= BULK RECEIVE ================= */
  const handleBulkReceive = async () => {
    try {
      const results = await Promise.allSettled(
        pendingParcels.map((p: any) =>
          confirmParcel(p._id).unwrap()
        )
      )

      const successCount = results.filter(
        (r) => r.status === 'fulfilled'
      ).length
      const failedCount = results.filter(
        (r) => r.status === 'rejected'
      ).length

      if (successCount > 0) {
        toast.success(`${successCount} parcel received successfully 📦`)
      }
      if (failedCount > 0) {
        toast.error(`${failedCount} parcel failed to receive`)
      }

      setShowBulkReceiveDialog(false)
    } catch {
      toast.error('Failed to receive parcels')
    }
  }

  /* ================= STATS ================= */
  const stats = [
    {
      label: 'Total Parcels',
      value: parcels.length,
      icon: FileText,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      trend: '+18%',
      trendUp: true,
    },
    {
      label: 'Received',
      value: parcels.filter(
        (p: any) => p.currentStatus === ParcelStatus.DELIVERED
      ).length,
      icon: Check,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+15%',
      trendUp: true,
    },
    {
      label: 'Pending',
      value: parcels.filter(
        (p: any) =>
          p.currentStatus === ParcelStatus.IN_TRANSIT ||
          p.currentStatus === ParcelStatus.OUT_FOR_DELIVERY
      ).length,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      trend: '-3%',
      trendUp: false,
    },
    {
      label: 'Cancelled',
      value: parcels.filter(
        (p: any) => p.currentStatus === ParcelStatus.CANCELLED
      ).length,
      icon: X,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '-100%',
      trendUp: true,
    },
  ]

  /* ================= UI ================= */
  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="sticky top-10 z-20 border-b bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between p-4 lg:p-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Deliveries
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track parcels you are receiving
            </p>
          </div>

          {pendingParcels.length > 0 && (
            <Button
              onClick={() => setShowBulkReceiveDialog(true)}
              className="flex gap-2 text-white cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Receive All ({pendingParcels.length})
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <Card
                key={i}
                className="bg-white border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${s.bgColor}`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      s.trendUp ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {s.trendUp ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                    {s.trend}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by tracking ID or sender..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Parcel List */}
        <div className="space-y-4">
          {isLoading && (
            <Card className="p-8 flex justify-center">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-cyan-600 rounded-full" />
            </Card>
          )}

          {!isLoading && filteredParcels.length === 0 && (
            <Card className="p-8 text-center">
              <Truck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-600">
                {parcels.length === 0
                  ? 'No parcels received yet'
                  : 'No parcels match your search'}
              </p>
            </Card>
          )}

          {filteredParcels.map((parcel: any) => (
            <ParcelCard
              key={parcel._id}
              parcel={parcel}
              role="receiver"
              statusConfig={statusConfig}
            />
          ))}
        </div>
      </div>

      {/* Bulk Receive Dialog */}
      <AlertDialog
        open={showBulkReceiveDialog}
        onOpenChange={setShowBulkReceiveDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Receive All Pending Parcels
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to receive {pendingParcels.length} parcel
              {pendingParcels.length !== 1 && 's'}.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 my-4 max-h-48 overflow-y-auto">
            {pendingParcels.slice(0, 5).map((p: any) => (
              <div key={p._id} className="text-sm text-emerald-800">
                <span className="font-mono">{p.trackingId}</span> — from{' '}
                {p.senderName}
              </div>
            ))}
            {pendingParcels.length > 5 && (
              <p className="text-sm italic text-emerald-600 mt-2">
                + {pendingParcels.length - 5} more parcels
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkReceive}
              className="cursor-pointer"
            >
              Receive All
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
