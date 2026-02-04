"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useCreateReviewMutation, useGetAllReviewsQuery } from "@/redux/features/review/review.api"
import { useGetSentParcelsQuery, useGetReceivedParcelsQuery } from "@/redux/features/parcel/parcel.api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function TestimonialSlider() {
  const { data: userData } = useUserInfoQuery(undefined)
  const user = userData?.data
  const userId = user?._id

  const { data: sentParcels } = useGetSentParcelsQuery(undefined)
  const { data: receivedParcels } = useGetReceivedParcelsQuery(undefined)

  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery(undefined)

  const [parcelId, setParcelId] = useState<string>("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [createReview, { isLoading }] = useCreateReviewMutation()

  const parcelOptions = [
    ...(sentParcels?.data?.map((p: any) => ({
      id: p._id,
      name: `To: ${p.receiverId?.name} - ${p.trackingId}`,
      toUserId: p.receiver?._id,
    })) || []),
    ...(receivedParcels?.data?.map((p: any) => ({
      id: p._id,
      name: `From: ${p.senderId?.name} - ${p.trackingId}`,
      toUserId: p.sender?._id,
    })) || []),
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!parcelId || !review) {
      toast.error("Please select a parcel and write your review")
      return
    }

    const selectedParcel = parcelOptions.find((p) => p.id === parcelId)
    if (!selectedParcel) return

    try {
      await createReview({
        parcelId,
        data: {
          rating,
          comment: review,
          isAnonymous: false,
          fromUserId: userId,
          toUserId: selectedParcel.toUserId,
        },
      }).unwrap()

      toast.success("Review submitted successfully!")
      setParcelId("")
      setReview("")
      setRating(5)
      setDialogOpen(false) // close popup on success
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review")
    }
  }

  if (!userId) return null

  return (
    <section className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-20 space-y-4 md:space-y-0">
        {/* Heading */}
        <div
          className={`space-y-2 ${
            user.role === "sender" || user.role === "receiver"
              ? "text-center md:text-left"
              : "text-center w-full"
          }`}
        >
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <p className="text-gray-600">Trusted by thousands of happy customers nationwide.</p>
        </div>

        {/* Give Review Button */}
        {(user.role === "sender" || user.role === "receiver") && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">Give a Review</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Submit Your Review</DialogTitle>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Parcel Select */}
                <Select onValueChange={setParcelId} value={parcelId}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select Parcel" />
                  </SelectTrigger>
                  <SelectContent>
                    {parcelOptions.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="cursor-pointer">
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* User Name */}
                <Input value={user.name} disabled />

                {/* Review Text */}
                <Textarea
                  placeholder="Your Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />

                {/* Star Rating */}
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Reviews Slider */}
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
        {reviewsLoading ? (
          <p className="text-center w-full">Loading reviews...</p>
        ) : (
          reviewsData?.data?.map((t: any) => (
            <SwiperSlide key={t._id} className="flex">
              <div className="bg-white p-6 shadow-lg flex flex-col items-center text-center space-y-4 flex-1 min-h-62.5">
                {/* Star Rating */}
                <div className="flex space-x-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>

                {/* Comment */}
                <p className="italic text-gray-700 flex-1">“{t.comment}”</p>

                {/* Reviewer Name */}
                <h4 className="font-semibold text-lg mt-auto">{t.fromUserId?.name || "Anonymous"}</h4>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  )
}
