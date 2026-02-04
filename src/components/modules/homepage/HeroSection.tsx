"use client"
import { Link } from "react-router"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center 
      bg-[url('/images/hero-1.jpg')] bg-cover bg-right md:bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80 md:opacity-40"></div>

      <div className="relative container mx-auto pt-20 md:pt-0 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-200 w-full lg:-mt-20">
            <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                Fast & Reliable Parcel Delivery
            </h1>
            <p className="leading-7 mt-4 lg:mt-6 text-white max-w-145">
                Send your parcels quickly and safely with our trusted delivery network. Track your packages in real-time and enjoy seamless doorstep delivery across the city.
            </p>
            <div className="flex items-center flex-col md:flex-row justify-start gap-4 mt-10">
                                    
                <Link to={"/track"}
                    className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                    Track Delivery
                </Link>
                                  

                <Link to="/contact"
                      className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}











