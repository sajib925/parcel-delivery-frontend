'use client'

import { useState } from 'react'
import { Menu, Plus, FileText, Truck, Check, X, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ParcelCard } from './parcelCard'
import { CreateParcelModal } from './createParcelModal'

interface UserDashboardProps {
  role: 'sender' | 'receiver'
  onToggleSidebar: () => void
}

// Mock data
const mockSentParcels = [
  {
    id: '1',
    trackingId: 'PKG-2024-001',
    receiverName: 'John Doe',
    receiverAddress: '123 Main St, City',
    status: 'In Transit',
    type: 'Package',
    weight: 2.5,
    fee: 100,
    estimatedDeliveryDate: '2024-02-05',
    createdAt: '2024-01-28',
  },
  {
    id: '2',
    trackingId: 'PKG-2024-002',
    receiverName: 'Jane Smith',
    receiverAddress: '456 Oak Ave, Town',
    status: 'Delivered',
    type: 'Document',
    weight: 0.5,
    fee: 50,
    estimatedDeliveryDate: '2024-02-03',
    createdAt: '2024-01-26',
  },
  {
    id: '3',
    trackingId: 'PKG-2024-003',
    receiverName: 'Bob Wilson',
    receiverAddress: '789 Pine Rd, Village',
    status: 'Approved',
    type: 'Fragile',
    weight: 1.8,
    fee: 90,
    estimatedDeliveryDate: '2024-02-10',
    createdAt: '2024-01-27',
  },
]

const mockReceivedParcels = [
  {
    id: '4',
    trackingId: 'PKG-2024-004',
    senderName: 'Alice Johnson',
    senderAddress: '321 Elm St, Metro',
    status: 'Out for Delivery',
    type: 'Package',
    weight: 3.0,
    fee: 120,
    estimatedDeliveryDate: '2024-01-29',
    createdAt: '2024-01-28',
  },
  {
    id: '5',
    trackingId: 'PKG-2024-005',
    senderName: 'Charlie Brown',
    senderAddress: '654 Maple Ln, District',
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

export function UserDashboard({ role, onToggleSidebar }: UserDashboardProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>(role === 'sender' ? 'sent' : 'received')

  const parcels = activeTab === 'sent' ? mockSentParcels : mockReceivedParcels
  const statsData = activeTab === 'sent'
    ? [
        { label: 'Total Sent', value: '12', icon: FileText, color: 'text-cyan-600' },
        { label: 'Delivered', value: '8', icon: Check, color: 'text-green-600' },
        { label: 'In Transit', value: '3', icon: Truck, color: 'text-blue-600' },
        { label: 'Pending', value: '1', icon: Clock, color: 'text-amber-600' },
      ]
    : [
        { label: 'Total Received', value: '8', icon: FileText, color: 'text-cyan-600' },
        { label: 'Confirmed', value: '5', icon: Check, color: 'text-green-600' },
        { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600' },
        { label: 'Issues', value: '0', icon: X, color: 'text-red-600' },
      ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {role === 'sender' ? 'Shipments' : 'Deliveries'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your parcels</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden bg-transparent"
            >
              <Menu className="h-4 w-4" />
            </Button>
            {role === 'sender' && (
              <Button
                onClick={() => setCreateModalOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Parcel</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-4 flex flex-col items-start">
                <div className={`${stat.color} mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        {role === 'sender' && (
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'sent'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sent
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'received'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Received
            </button>
          </div>
        )}

        {/* Parcels Grid */}
        <div className="grid gap-4">
          {parcels.length > 0 ? (
            parcels.map((parcel) => (
              <ParcelCard
                key={parcel.id}
                parcel={parcel}
                role={role}
                statusConfig={statusConfig}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No parcels yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Parcel Modal */}
      <CreateParcelModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}
