'use client'

import { useState } from 'react'
import { BarChart3, Clock, Check,  Lock, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminParcel } from '@/types'
import {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} from '@/redux/features/parcel/parcel.api'

const statusColors: Record<string, string> = {
  Requested: 'bg-gray-100 text-gray-700',
  Approved: 'bg-blue-100 text-blue-700',
  'In Transit': 'bg-cyan-100 text-cyan-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Returned: 'bg-orange-100 text-orange-700',
}

export function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedParcels, setSelectedParcels] = useState<string[]>([])
  const { data, isLoading } = useGetAllParcelsQuery(undefined)
  const [updateStatus] = useUpdateParcelStatusMutation()
  const [blockParcel] = useBlockParcelMutation()
  const parcels: AdminParcel[] = (data?.data || []).map((p: any) => ({
    ...p,
    id: p._id,
    senderName: p.senderId?.name ?? 'Unknown Sender',
    senderEmail: p.senderId?.email ?? 'Unknown Email',
    receiverName: p.receiverId?.name ?? 'Unknown Receiver',
    receiverEmail: p.receiverId?.email ?? 'Unknown Email',
    isBlocked: p.isBlocked ?? false,
    isCancelled: p.isCancelled ?? false,
    status: p.currentStatus ?? 'Requested',
  }))


  console.log("data", data?.data);


  const [parcelStatus, setParcelStatus] = useState<Record<string, string>>(() => {
    const initialStatus: Record<string, string> = {}
    parcels.forEach(p => {
      initialStatus[p.id] = p.status
    })
    return initialStatus
  })

  const [updating, setUpdating] = useState<Record<string, boolean>>({})
  const [blocking, setBlocking] = useState<Record<string, boolean>>({})
  const filteredParcels =
    statusFilter === 'all'
      ? parcels
      : parcels.filter(p => p.status === statusFilter)

  const toggleParcelSelection = (id: string) => {
    setSelectedParcels(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleUpdateStatus = async (parcelId: string) => {
    const status = parcelStatus[parcelId]
    if (!status) return
    setUpdating(prev => ({ ...prev, [parcelId]: true }))
    await updateStatus({ parcelId, status })
    setUpdating(prev => ({ ...prev, [parcelId]: false }))
  }

  const handleBlockParcel = async (parcelId: string) => {
    setBlocking(prev => ({ ...prev, [parcelId]: true }))
    await blockParcel(parcelId)
    setBlocking(prev => ({ ...prev, [parcelId]: false }))
  }
  
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex gap-2">
          {['all', 'Requested', 'Approved', 'In Transit', 'Delivered'].map(s => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? 'default' : 'outline'}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredParcels.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-10 h-10 mx-auto opacity-40" />
          <p className="text-muted-foreground">No parcels found</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full border rounded-lg min-w-300">
          <table className="w-full text-sm text-left ">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedParcels.length === filteredParcels.length}
                    onChange={e =>
                      setSelectedParcels(
                        e.target.checked ? filteredParcels.map(p => p.id) : []
                      )
                    }
                  />
                </th>
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Sender Name</th>
                <th className="p-2">Sender Email</th>
                <th className="p-2">Receiver Name</th>
                <th className="p-2">Receiver Email</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
                <th className="p-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              {filteredParcels.map(parcel => (
                <tr
                  key={parcel.id}
                  className={`border-b ${
                    selectedParcels.includes(parcel.id) ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedParcels.includes(parcel.id)}
                      onChange={() => toggleParcelSelection(parcel.id)}
                    />
                  </td>
                  <td className="p-2 font-mono font-bold text-primary">
                    {parcel.trackingId}
                  </td>
                  <td className="p-2">{parcel.senderName}</td>
                  <td className="p-2">{parcel.senderEmail}</td>
                  <td className="p-2">{parcel.receiverName}</td>
                  <td className="p-2">{parcel.receiverEmail}</td>
                  <td className="p-2">
                    <select
                      value={parcelStatus[parcel.id] || parcel.status}
                      onChange={e =>
                        setParcelStatus(prev => ({
                          ...prev,
                          [parcel.id]: e.target.value,
                        }))
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        statusColors[parcelStatus[parcel.id] || parcel.status]
                      }`}
                    >
                      {Object.keys(statusColors).map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 flex gap-1">
                    {/* Update */}
                    {parcelStatus[parcel.id] !== parcel.status && (
                      <Button
                        size="sm"
                        className="px-2 h-6 text-xs"
                        onClick={() => handleUpdateStatus(parcel.id)}
                        disabled={updating[parcel.id]}
                      >
                        {updating[parcel.id] ? (
                          <Clock className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Check className="w-3 h-3 mr-1" />
                        )}
                        Update
                      </Button>
                    )}

                    {/* Block */}
                    <Button
                      size="sm"
                      className="h-6 px-2"
                      variant={parcel.isBlocked ? 'default' : 'destructive'}
                      onClick={() => handleBlockParcel(parcel.id)}
                      disabled={blocking[parcel.id]}
                    >
                      {blocking[parcel.id] ? (
                        <Clock className="w-3 h-3 mr-1 animate-spin" />
                      ) : parcel.isBlocked ? (
                        <Unlock className="w-3 h-3 text-green-600" />
                      ) : (
                        <Lock className="w-3 h-3 text-amber-600" />
                      )}
                    </Button>
                  </td>
                  <td className="p-2 font-bold">৳{parcel.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
