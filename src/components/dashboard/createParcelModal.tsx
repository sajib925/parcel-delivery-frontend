'use client'

import React from "react"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CreateParcelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateParcelModal({ open, onOpenChange }: CreateParcelModalProps) {
  const [formData, setFormData] = useState({
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverAddress: '',
    parcelType: 'Package',
    weight: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      // Reset form
      setFormData({
        receiverName: '',
        receiverEmail: '',
        receiverPhone: '',
        receiverAddress: '',
        parcelType: 'Package',
        weight: '',
        description: '',
      })
    }, 1000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h2 className="text-xl font-bold text-foreground">Create New Parcel</h2>
            <p className="text-xs text-muted-foreground mt-1">Fill in the parcel details</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Receiver Name *
              </label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+880 1712345678"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="receiverEmail"
              value={formData.receiverEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Address *
            </label>
            <textarea
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="123 Main Street, City, Country"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Parcel Type *
              </label>
              <select
                name="parcelType"
                value={formData.parcelType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Package">Package</option>
                <option value="Document">Document</option>
                <option value="Fragile">Fragile</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Add any special instructions..."
            />
          </div>

          {/* Fee Preview */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fee</span>
              <span className="font-medium">৳50</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-muted-foreground">Weight Fee ({formData.weight || '0'} kg)</span>
              <span className="font-medium">
                ৳{formData.weight ? (Number(formData.weight) * 20).toFixed(0) : '0'}
              </span>
            </div>
            <div className="border-t border-border mt-2 pt-2 flex justify-between text-sm font-bold">
              <span>Total</span>
              <span>
                ৳{formData.weight ? (50 + Number(formData.weight) * 20).toFixed(0) : '50'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Parcel'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
