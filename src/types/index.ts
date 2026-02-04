import { LucideIcon  } from 'lucide-react'

export type TRole = "ADMIN" | "RECEIVER" | "SENDER";

export interface ISidebarItem {
  title: string
  items: Array<{
    title: string
    url: string
    icon:  LucideIcon
    component?: React.ComponentType
  }>
}


export interface Parcel {
  _id: string
  trackingId: string
  senderName?: string
  receiverName?: string
  status: string
  type: string
  weight: number
  fee: number
  isBlocked?: boolean
  isCancelled?: boolean
  createdAt: string
}


  // Admin specific parcel 

export interface AdminParcel extends Parcel {
  id: string
  senderName: string
  senderEmail: string
  receiverName: string
  receiverEmail: string
  isBlocked: boolean
  isCancelled: boolean
}


export interface StatusConfig {
  color: string
  bgColor: string
  icon: LucideIcon
}

export interface ICreateContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export enum ParcelStatus {
  REQUESTED = "Requested",
  APPROVED = "Approved",
  DISPATCHED = "Dispatched",
  IN_TRANSIT = "In Transit",
  OUT_FOR_DELIVERY = "Out for Delivery",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
  RETURNED = "Returned",
}