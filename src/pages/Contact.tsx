"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import image from "../assets/image/contact.jpg"
import { useCreateContactMutation } from "@/redux/contact/contact.api"
import { ICreateContactPayload } from "@/types"

export default function Contact() {
  const form = useForm<ICreateContactPayload>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const [createContact, { isLoading }] = useCreateContactMutation()

  const onSubmit = async (data: ICreateContactPayload) => {
    try {
      await createContact(data).unwrap()
      toast.success("Message sent successfully 🚀")
      form.reset()
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong, try again!"
      )
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-30 lg:pt-40 pb-20 lg:pb-25 space-y-20 lg:space-y-25">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <img src={image} alt="Contact us" className="object-cover w-full" />
        </div>

        {/* Form */}
        <div>
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Map Section */}
     {/* Map Section */}
    <div className="space-y-6 lg:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Delivery Hub</h2>
        <p className="text-muted-foreground mt-4">
          Central operations and parcel handling center in Dhaka
        </p>
      </div>

      <div className="w-full h-105 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://maps.google.com/maps?q=23.750885,90.384253&z=15&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    </div>
  )
}
