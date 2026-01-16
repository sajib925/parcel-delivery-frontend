"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"

interface UpdateParcelStatusModalProps {
  parcel: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdateParcelStatusModal({ parcel, open, onOpenChange }: UpdateParcelStatusModalProps) {
  const [updateStatus, { isLoading }] = useUpdateParcelStatusMutation()
  const form = useForm({
    defaultValues: {
      status: parcel?.status || "pending",
      notes: "",
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await updateStatus({ parcelId: parcel.id, ...data }).unwrap()
      toast.success("Parcel status updated successfully")
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update parcel")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Parcel Status</DialogTitle>
          <DialogDescription>Tracking ID: {parcel?.trackingId}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Add any notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
