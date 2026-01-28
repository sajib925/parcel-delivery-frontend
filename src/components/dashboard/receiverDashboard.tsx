'use client'

import { Menu, FileText, Check, Clock, X, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ParcelCard } from './parcelCard'

const mockReceivedParcels = [
  {
    id: '5',
    trackingId: 'PKG-2024-005',
    senderName: 'Charlie Brown',
    senderAddress: '654 Maple Ln',
    status: 'Delivered',
    type: 'Electronics',
    weight: 2.2,
    fee: 110,
    estimatedDeliveryDate: '2024-01-27',
    createdAt: '2024-01-26',
  },
]

const statusConfig: Record<string, { color: string; bgColor: string; icon: typeof Clock }> = {
  'In Transit': { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Truck },
  'Out for Delivery': { color: 'text-amber-600', bgColor: 'bg-amber-50', icon: Clock },
  Delivered: { color: 'text-green-600', bgColor: 'bg-green-50', icon: Check },
  Approved: { color: 'text-cyan-600', bgColor: 'bg-cyan-50', icon: Check },
  Requested: { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Clock },
  Cancelled: { color: 'text-red-600', bgColor: 'bg-red-50', icon: X },
}

export function ReceiverDashboardComponents() {
  const stats = [
    { label: 'Total Received', value: '8', icon: FileText, color: 'text-cyan-600' },
    { label: 'Confirmed', value: '5', icon: Check, color: 'text-green-600' },
    { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600' },
    { label: 'Issues', value: '0', icon: X, color: 'text-red-600' },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl font-bold">Deliveries</h1>
            <p className="text-sm text-muted-foreground">
              Parcels you are receiving
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <Card key={i} className="p-4">
              <Icon className={`w-5 h-5 ${s.color}`} />
              <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Parcels */}
      <div className="p-4 lg:p-6 space-y-4">
        {mockReceivedParcels.map(parcel => (
          <ParcelCard
            key={parcel.id}
            parcel={parcel}
            role="receiver"
            statusConfig={statusConfig}
          />
        ))}
      </div>
    </div>
  )
}
