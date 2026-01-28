'use client'

import { useState } from 'react'
import { Menu, Plus, FileText, Truck, Check, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ParcelCard } from './parcelCard'
import { CreateParcelModal } from './createParcelModal'


const mockSentParcels = [
  {
    id: '1',
    trackingId: 'PKG-2024-001',
    receiverName: 'John Doe',
    receiverAddress: '123 Main St',
    status: 'In Transit',
    type: 'Package',
    weight: 2.5,
    fee: 100,
    estimatedDeliveryDate: '2024-02-05',
    createdAt: '2024-01-28',
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



export function SenderDashboardComponents() {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const stats = [
    { label: 'Total Sent', value: '12', icon: FileText, color: 'text-cyan-600' },
    { label: 'Delivered', value: '8', icon: Check, color: 'text-green-600' },
    { label: 'In Transit', value: '3', icon: Truck, color: 'text-blue-600' },
    { label: 'Pending', value: '1', icon: Clock, color: 'text-amber-600' },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl font-bold">Shipments</h1>
            <p className="text-sm text-muted-foreground">
              Manage parcels you’ve sent
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Parcel
            </Button>
          </div>
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
        {mockSentParcels.map(parcel => (
          <ParcelCard
            key={parcel.id}
            parcel={parcel}
            role="sender"
            statusConfig={statusConfig}
          />
        ))}
      </div>

      <CreateParcelModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}
