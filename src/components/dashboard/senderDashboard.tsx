'use client'

import { useState } from 'react'
import {
  Menu,
  Plus,
  FileText,
  Truck,
  Check,
  Clock,
  X,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ParcelCard } from './parcelCard'
import { CreateParcelModal } from './createParcelModal'
import { useGetSentParcelsQuery } from '@/redux/features/parcel/parcel.api'

const statusConfig: Record<
  string,
  { color: string; bgColor: string; icon: typeof Clock }
> = {
  'In Transit': { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Truck },
  'Out for Delivery': {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    icon: Clock,
  },
  Delivered: { color: 'text-green-600', bgColor: 'bg-green-50', icon: Check },
  Approved: { color: 'text-cyan-600', bgColor: 'bg-cyan-50', icon: Check },
  Requested: { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Clock },
  Cancelled: { color: 'text-red-600', bgColor: 'bg-red-50', icon: X },
}

export function SenderDashboardComponents() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isError } = useGetSentParcelsQuery(undefined)
  const parcels = data?.data || []

  const filteredParcels = parcels.filter((p: any) =>
    p._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.receiverName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = [
    {
      label: 'Total Sent',
      value: parcels.length,
      icon: FileText,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Delivered',
      value: parcels.filter((p: any) => p.status === 'Delivered').length,
      icon: Check,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+8%',
      trendUp: true,
    },
    {
      label: 'In Transit',
      value: parcels.filter((p: any) => p.status === 'In Transit').length,
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '-2%',
      trendUp: false,
    },
    {
      label: 'Pending',
      value: parcels.filter(
        (p: any) => p.status === 'Requested' || p.status === 'Approved'
      ).length,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      trend: '+5%',
      trendUp: true,
    },
  ]

  return (
    <div className="w-full bg-linear-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="sticky top-10 z-20 border-b bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Shipments</h1>
            <p className="text-sm text-slate-500 mt-1">Manage all parcels you've sent</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="lg:hidden text-slate-600 bg-transparent">
              <Menu className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => setCreateModalOpen(true)}
              className="gap-2 text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Parcel</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <Card
                key={i}
                className="bg-white border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${s.bgColor}`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className={`text-sm font-semibold flex items-center gap-1 ${s.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                    {s.trendUp ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                    {s.trend}
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-medium mb-2">{s.label}</p>
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by tracking ID or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500"
            />
          </div>
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Parcels List */}
        <div className="space-y-4">
          {isLoading && (
            <Card className="bg-white border border-slate-200 p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600" />
              </div>
            </Card>
          )}

          {isError && (
            <Card className="bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700">Failed to load parcels. Please try again.</p>
            </Card>
          )}

          {!isLoading && filteredParcels.length === 0 && (
            <Card className="bg-white border border-slate-200 p-8">
              <div className="text-center">
                <Truck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  {parcels.length === 0 ? 'No parcels sent yet' : 'No parcels match your search'}
                </p>
              </div>
            </Card>
          )}

          {filteredParcels.map((parcel: any) => (
            <ParcelCard
              key={parcel._id}
              parcel={parcel}
              role="sender"
              statusConfig={statusConfig}
            />
          ))}
        </div>
      </div>

      {/* Create Modal */}
      <CreateParcelModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}















// 'use client'

// import { useState } from 'react'
// import {
//   Menu,
//   Plus,
//   FileText,
//   Truck,
//   Check,
//   Clock,
//   X,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { ParcelCard } from './parcelCard'
// import { CreateParcelModal } from './createParcelModal'
// import { useGetSentParcelsQuery } from '@/redux/features/parcel/parcel.api'

// const statusConfig: Record<
//   string,
//   { color: string; bgColor: string; icon: typeof Clock }
// > = {
//   'In Transit': { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Truck },
//   'Out for Delivery': {
//     color: 'text-amber-600',
//     bgColor: 'bg-amber-50',
//     icon: Clock,
//   },
//   Delivered: { color: 'text-green-600', bgColor: 'bg-green-50', icon: Check },
//   Approved: { color: 'text-cyan-600', bgColor: 'bg-cyan-50', icon: Check },
//   Requested: { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Clock },
//   Cancelled: { color: 'text-red-600', bgColor: 'bg-red-50', icon: X },
// }

// export function SenderDashboardComponents() {
//   const [createModalOpen, setCreateModalOpen] = useState(false)

//   // ✅ REAL API CALL
//   const { data, isLoading, isError } = useGetSentParcelsQuery(undefined)

//   const parcels = data?.data || []


//   // 📊 stats calculated from API data
//   const stats = [
//     {
//       label: 'Total Sent',
//       value: parcels.length,
//       icon: FileText,
//       color: 'text-cyan-600',
//     },
//     {
//       label: 'Delivered',
//       value: parcels.filter((p: any) => p.status === 'Delivered').length,
//       icon: Check,
//       color: 'text-green-600',
//     },
//     {
//       label: 'In Transit',
//       value: parcels.filter((p: any) => p.status === 'In Transit').length,
//       icon: Truck,
//       color: 'text-blue-600',
//     },
//     {
//       label: 'Pending',
//       value: parcels.filter(
//         (p: any) => p.status === 'Requested' || p.status === 'Approved'
//       ).length,
//       icon: Clock,
//       color: 'text-amber-600',
//     },
//   ]

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="sticky top-0 z-20 border-b bg-card">
//         <div className="flex items-center justify-between p-4 lg:p-6">
//           <div>
//             <h1 className="text-2xl font-bold">Shipments</h1>
//             <p className="text-sm text-muted-foreground">
//               Manage parcels you’ve sent
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-4 w-4" />
//             </Button>

//             <Button
//               onClick={() => setCreateModalOpen(true)}
//               className="gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Create Parcel
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((s, i) => {
//           const Icon = s.icon
//           return (
//             <Card key={i} className="p-4">
//               <Icon className={`w-5 h-5 ${s.color}`} />
//               <p className="text-xs text-muted-foreground mt-2">
//                 {s.label}
//               </p>
//               <p className="text-2xl font-bold">{s.value}</p>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Parcels */}
//       <div className="p-4 lg:p-6 space-y-4">
//         {isLoading && (
//           <p className="text-sm text-muted-foreground">
//             Loading parcels...
//           </p>
//         )}

//         {isError && (
//           <p className="text-sm text-red-500">
//             Failed to load parcels
//           </p>
//         )}

//         {!isLoading && parcels.length === 0 && (
//           <p className="text-sm text-muted-foreground">
//             No parcels found
//           </p>
//         )}

//         {parcels.map((parcel: any) => (
//           <ParcelCard
//             key={parcel._id}
//             parcel={parcel}
//             role="sender"
//             statusConfig={statusConfig}
//           />
//         ))}
//       </div>

//       {/* Create Modal */}
//       <CreateParcelModal
//         open={createModalOpen}
//         onOpenChange={setCreateModalOpen}
//       />
//     </div>
//   )
// }
