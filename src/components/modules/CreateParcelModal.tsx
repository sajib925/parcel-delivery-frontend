"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api"
import { toast } from "sonner"
import { Input } from "../ui/input"

const createParcelSchema = z.object({
  receiverName: z.string().min(3, "Receiver name is required"),
  receiverPhone: z.string().min(10, "Valid phone number required"),
  receiverAddress: z.string().min(10, "Address is required"),
  weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),
  description: z.string().optional(),
})

interface CreateParcelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateParcelModal({ open, onOpenChange }: CreateParcelModalProps) {
  const [createParcel, { isLoading }] = useCreateParcelMutation()
  const form = useForm({
    resolver: zodResolver(createParcelSchema),
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      weight: 0,
      description: "",
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await createParcel(data).unwrap()
      toast.success("Parcel created successfully")
      onOpenChange(false)
      form.reset()
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create parcel")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Parcel</DialogTitle>
          <DialogDescription>Enter the parcel details to create a new shipment</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0300-1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Complete address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Parcel description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Parcel"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
