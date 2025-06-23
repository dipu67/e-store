"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import Image from "next/image"

export default function Banner() {
  const itemCount = 5
  const images = Array.from({ length: itemCount }, (_, i) => `/banner/banner${i + 1}.png`)

  return (
    <div className="w-full mt-4 px-2 mb-4 md:px-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={30}
        className="rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              className="object-cover rounded-lg w-full"
              width={1400}
              height={531}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
