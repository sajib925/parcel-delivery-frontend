'use client'

import { useState } from 'react'
import { Menu, TrendingUp, Users, Package, AlertCircle, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AdminParcelCard } from './adminParcelCard'


// Mock admin data
const mockAllParcels = [
  {
    id: '1',
    trackingId: 'PKG-2024-001',
    senderName: 'Alice Johnson',
    receiverName: 'John Doe',
    status: 'In Transit',
    type: 'Package',
    weight: 2.5,
    fee: 100,
    isBlocked: false,
    isCancelled: false,
    createdAt: '2024-01-28',
  },
  {
    id: '2',
    trackingId: 'PKG-2024-002',
    senderName: 'Bob Smith',
    receiverName: 'Jane Williams',
    status: 'Approved',
    type: 'Document',
    weight: 0.5,
    fee: 50,
    isBlocked: false,
    isCancelled: false,
    createdAt: '2024-01-27',
  },
  {
    id: '3',
    trackingId: 'PKG-2024-003',
    senderName: 'Charlie Brown',
    receiverName: 'Bob Wilson',
    status: 'Delivered',
    type: 'Electronics',
    weight: 1.8,
    fee: 90,
    isBlocked: false,
    isCancelled: false,
    createdAt: '2024-01-26',
  },
  {
    id: '4',
    trackingId: 'PKG-2024-004',
    senderName: 'Diana Prince',
    receiverName: 'Eve Davis',
    status: 'Out for Delivery',
    type: 'Fragile',
    weight: 3.0,
    fee: 120,
    isBlocked: false,
    isCancelled: false,
    createdAt: '2024-01-28',
  },
  {
    id: '5',
    trackingId: 'PKG-2024-005',
    senderName: 'Frank Miller',
    receiverName: 'Grace Lee',
    status: 'Requested',
    type: 'Package',
    weight: 2.2,
    fee: 110,
    isBlocked: false,
    isCancelled: false,
    createdAt: '2024-01-25',
  },
]

const adminStats = [
  {
    label: 'Total Parcels',
    value: '156',
    change: '+12% from last week',
    icon: Package,
    color: 'text-blue-600',
  },
  {
    label: 'Active Users',
    value: '48',
    change: '+3 new users',
    icon: Users,
    color: 'text-green-600',
  },
  {
    label: 'Revenue',
    value: '$12,450',
    change: '+8% from last week',
    icon: TrendingUp,
    color: 'text-cyan-600',
  },
  {
    label: 'Issues',
    value: '2',
    change: '1 blocked parcel',
    icon: AlertCircle,
    color: 'text-red-600',
  },
]

export function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedParcels, setSelectedParcels] = useState<string[]>([])

  const filteredParcels = statusFilter === 'all'
    ? mockAllParcels
    : mockAllParcels.filter(p => p.status === statusFilter)

  const toggleParcelSelection = (parcelId: string) => {
    setSelectedParcels(prev =>
      prev.includes(parcelId)
        ? prev.filter(id => id !== parcelId)
        : [...prev, parcelId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedParcels.length === filteredParcels.length) {
      setSelectedParcels([])
    } else {
      setSelectedParcels(filteredParcels.map(p => p.id))
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage all parcels and users</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            // onClick={onToggleSidebar}
            className="lg:hidden bg-transparent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setStatusFilter('all')}
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              All
            </Button>
            {['Requested', 'Approved', 'In Transit', 'Out for Delivery', 'Delivered'].map(status => (
              <Button
                key={status}
                onClick={() => setStatusFilter(status)}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {status}
              </Button>
            ))}
          </div>
          {selectedParcels.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedParcels.length} selected
            </div>
          )}
        </div>

        {/* Parcels Table/List */}
        <div className="space-y-3">
          {/* Header row for desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 bg-secondary rounded-lg">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedParcels.length === filteredParcels.length && filteredParcels.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
            </div>
            <div className="col-span-2 text-xs font-semibold text-foreground">Tracking ID</div>
            <div className="col-span-2 text-xs font-semibold text-foreground">Sender</div>
            <div className="col-span-2 text-xs font-semibold text-foreground">Receiver</div>
            <div className="col-span-1 text-xs font-semibold text-foreground">Status</div>
            <div className="col-span-2 text-xs font-semibold text-foreground">Actions</div>
            <div className="col-span-1 text-xs font-semibold text-foreground">Fee</div>
          </div>

          {/* Parcel items */}
          {filteredParcels.length > 0 ? (
            filteredParcels.map(parcel => (
              <AdminParcelCard
                key={parcel.id}
                parcel={parcel}
                isSelected={selectedParcels.includes(parcel.id)}
                onToggleSelect={() => toggleParcelSelection(parcel.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No parcels found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
