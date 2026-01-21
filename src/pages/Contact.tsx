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

export default function Contact() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
    toast.success("Message sent successfully")
    form.reset()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image} 
            alt="Contact us"
            className="object-cover"
          />
        </div>

        {/* Right Form */}
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
                <Button type="submit" className="cursor-pointer">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

    {/* Delivery Location Section */}
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Delivery Hub</h2>
        <p className="text-muted-foreground mt-2">
          Central operations and parcel handling center in Dhaka
        </p>
      </div>

      <div className="w-full h-105 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902178079494!2d90.384253!3d23.750885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b8cfa4bdb1%3A0x6f6bdf9c9d7f5b1a!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000"
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
        />
      </div>
    </div>

    </div>
  )
}
