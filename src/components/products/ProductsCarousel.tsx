import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCarouselImages } from '../../hooks/useCarouselImages'
import CarouselSkeleton from '../CarouselSkeleton'
import CarouselEmpty from '../CarouselEmpty'
import CarouselError from '../CarouselError'
import { Link } from 'react-router-dom'

const ProductsCarousel: React.FC = () => {
  const { data, isLoading, isError } = useCarouselImages()

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl mb-4">Products Carousel</h2>
      {isLoading ? (
        <CarouselSkeleton />
      ) : isError ? (
        <CarouselError message="An error occurred while loading the carousel." />
      ) : data && data?.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-md p-4">
                <Link to={'#'}>
                  <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-md mb-2" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <CarouselEmpty />
      )}
    </div>
  )
}

export default ProductsCarousel