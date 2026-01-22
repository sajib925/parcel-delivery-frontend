"use client"

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';


import bike from "@/assets/image/bike.png"
import { Autoplay, EffectFade } from "swiper/modules";

const slides = [
  {
    title: "Largest and trusted courier delivery service",
    highlight: "in your city",
    desc: "Send and receive parcels quickly, safely, and without any worries.",
    image: bike,
  },
  {
    title: "Fast and reliable parcel delivery service",
    highlight: "across the country",
    desc: "Send and receive parcels quickly, safely, and without any worries.",
    image: bike,
  },
  {
    title: "Secure and professional courier delivery service",
    highlight: "you can trust",
    desc: "Send and receive parcels quickly, safely, and without any worries.",
    image: bike,
  },
]


export default function HeroSlider() {
  return (
    <section className="bg-green-50 h-screen flex items-center justify-center">
      <Swiper 
        className="mySwiper" 
        loop={true}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >

        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  {slide.title}{" "}
                  <span className="text-green-600">{slide.highlight}</span>
                </h1>
                <p className="text-gray-600 text-lg">{slide.desc}</p>

                <div className="flex gap-4 justify-center md:justify-start">
                  <Link to="/register">
                    <Button size="lg" className="bg-green-600">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/track">
                    <Button size="lg" variant="outline">
                      Track Parcel
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img src={slide.image} className="w-80" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
