"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const testimonials = [
  {
    name: "Adam Smith",
    role: "Developer",
    review: "Fast and reliable service!",
  },
  {
    name: "Sofia Carolino",
    role: "Designer",
    review: "Very professional and timely.",
  },
  {
    name: "Marfie Motcast",
    role: "Entrepreneur",
    review: "Highly recommend Fast Box!",
  },
]

export default function TestimonialSlider() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <p className="text-gray-600">
            Trusted by thousands of happy customers nationwide.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600">Give a Review</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Your Review</DialogTitle>
              </DialogHeader>

              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Profession" />
                <Textarea placeholder="Your Review" />
                <Button className="w-full bg-green-600">
                  Submit Review
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Side Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500 }}
          loop
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-green-50 p-8 rounded-xl shadow">
                <p className="italic text-gray-700 mb-4">
                  “{t.review}”
                </p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
