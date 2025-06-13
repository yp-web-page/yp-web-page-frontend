import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetFeaturedProducts } from '../../hooks/useGetFeaturedProducts';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/pagination';

const FeaturedProductsCarousel: React.FC = () => {
  const { data, isLoading, error } = useGetFeaturedProducts();

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos</div>;
  if (!data?.products?.length) return <div>No hay productos destacados</div>;

  return (
    <div className="w-full bg-white py-8">
      <div className="w-full px-4 max-w-7xl mx-auto">
        <style>
          {`
            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: #D1D5DB;
              opacity: 1;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              background-color: #2563EB;
              width: 24px;
              border-radius: 5px;
            }
            .swiper-pagination {
              bottom: 0 !important;
            }
            .swiper-slide {
              height: auto;
              display: flex;
              justify-content: center;
            }
            .swiper {
              padding: 0 1rem;
            }
          `}
        </style>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            }
          }}
          className="w-full"
        >
          {data.products.map((product) => (
            <SwiperSlide key={product.id} className='py-4 px-2 sm:px-4 flex justify-center'>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel
