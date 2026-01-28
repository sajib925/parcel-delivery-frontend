"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay } from "swiper/modules";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Link } from "react-router";

const HeroSlider = () => {
    const { data: userData } = useUserInfoQuery(undefined);

    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper h-screen w-full relative"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="bg-[url('/images/hero-1.jpg')] bg-no-repeat bg-cover h-screen">
                        <div className="absolute w-full lg:w-[80%] inset-0bg-linear-to-r from-white to-transparent"></div>
                        <div className="mx-auto w-full container px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-200 w-full lg:-mt-20">
                                <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Fast & Reliable Parcel Delivery
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-white max-w-145">
                                    Send your parcels quickly and safely with our trusted delivery network. Track your packages in real-time and enjoy seamless doorstep delivery across the city.
                                </p>
                                <div className="flex items-center flex-col md:flex-row justify-start gap-4 mt-4">
                                    {!userData?.id && (
                                        <Link to={"/login"}
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Send a Parcel
                                        </Link>
                                    )}

                                    {userData?.id && !userData?.isCourier && (
                                        <Link to="/track"
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Track Delivery
                                        </Link>
                                    )}

                                    <Link to="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="bg-[url('/images/hero-2.jpg')] bg-no-repeat bg-cover h-screen">
                        <div className="absolute w-full lg:w-[80%] inset-0 bg-linear-to-r from-white to-transparent"></div>
                        <div className="mx-auto w-full container px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-200 w-full lg:-mt-20">
                                <h1 className="text-[#111] text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Track Your Parcel in Real-Time
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-[#1c1c1c] max-w-145">
                                    Stay updated on every step of your delivery. Our live tracking feature ensures you know exactly where your parcel is until it reaches your doorstep.
                                </p>
                                <div className="flex items-center flex-col md:flex-row justify-start gap-4 mt-4">
                                    {!userData?.id && (
                                        <Link to={"/login"}
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Send a Parcel
                                        </Link>
                                    )}

                                    {userData?.id && !userData?.isCourier && (
                                        <Link to="/track"
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Track Delivery
                                        </Link>
                                    )}

                                    <Link to="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="bg-[url('/images/hero-3.jpg')] bg-no-repeat bg-cover h-screen">
                        <div className="absolute w-full lg:w-[80%] inset-0 bg-linear-to-r from-white to-transparent"></div>
                        <div className="mx-auto w-full container px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-200 w-full lg:-mt-20">
                                <h1 className="text-[#111] text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Same-Day & Next-Day Delivery
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-[#1c1c1c] max-w-145">
                                    Our courier service ensures same-day and next-day deliveries. Experience reliable and secure parcel handling from pickup to delivery.
                                </p>
                                <div className="flex items-center flex-col md:flex-row justify-start gap-4 mt-4">
                                    {!userData?.id && (
                                        <Link to={"/login"}
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Send a Parcel
                                        </Link>
                                    )}

                                    {userData?.id && !userData?.isCourier && (
                                        <Link to="/track"
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Track Delivery
                                        </Link>
                                    )}

                                    <Link to="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HeroSlider;
