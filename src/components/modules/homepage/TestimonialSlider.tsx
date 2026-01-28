"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react" // using lucide for star icons
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Link } from "react-router"

const testimonials = [
  {
    name: "Adam Smith",
    role: "Developer",
    review: "Fast and reliable service!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sofia Carolino",
    role: "Designer",
    review: "Very professional and timely.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Marfie Motcast",
    role: "Entrepreneur",
    review: "Highly recommend Fast Box!",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
  },
  {
    name: "Lisa Ray",
    role: "Marketer",
    review: "Excellent communication and service.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
  },
]

export default function TestimonialSlider() {
    const { data } = useUserInfoQuery(undefined)
  
    const user = data?.data
    const userId = user?._id
  
  return (
    <section className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-20 space-y-4 md:space-y-0">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <p className="text-gray-600">Trusted by thousands of happy customers nationwide.</p>
        </div>
        {userId ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Give a Review</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Submit Your Review</DialogTitle>
            </DialogHeader>

            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Profession" />
              <Textarea placeholder="Your Review" />
              <Button className="w-full bg-green-600 hover:bg-green-700">Submit Review</Button>
            </form>
          </DialogContent>
        </Dialog>
          ) : (
            <Link to="/login">
              <Button className="cursor-pointer">Give a Review</Button>
            </Link>
          )}

      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white p-6  shadow-lg flex flex-col items-center text-center space-y-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-green-600"
              />
              <div className="flex space-x-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <p className="italic text-gray-700">“{t.review}”</p>
              <h4 className="font-semibold text-lg">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
