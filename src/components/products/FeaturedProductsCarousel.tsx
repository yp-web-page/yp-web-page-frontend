import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetFeaturedProducts } from '../../hooks/useGetFeaturedProducts';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/pagination';

const FeaturedProductsCarousel: React.FC = () => {
  const { data, isLoading, error } = useGetFeaturedProducts();

  return (
    <section id="productos" className="pt-20 lg:pt-28 pb-5 lg:pb-7 bg-yp-paper border-y border-yp-line">
      <div className="max-w-[1400px] mx-auto px-6">
        {isLoading && <div className="text-yp-muted">Cargando productos...</div>}
        {error && <div className="text-red-500">Error al cargar los productos</div>}
        {!isLoading && !error && !data?.products?.length && (
          <div className="text-yp-muted">No hay productos destacados</div>
        )}

        {!!data?.products?.length && (
          <>
            <style>
              {`
                .featured-carousel .swiper-pagination-bullet {
                  width: 10px; height: 10px; background-color: var(--color-yp-line); opacity: 1; transition: all 0.3s ease;
                }
                .featured-carousel .swiper-pagination-bullet-active {
                  background-color: var(--color-yp-bright); width: 28px; border-radius: 5px;
                }
                .featured-carousel .swiper-pagination { bottom: 0 !important; position: static !important; margin-top: 2rem; }
                .featured-carousel .swiper-slide { height: auto; display: flex; justify-content: center; }
              `}
            </style>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="featured-carousel w-full"
            >
              {data.products.map((product) => (
                <SwiperSlide key={product.id} className="py-4">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-yp-bright">
            <span className="size-1.5 rounded-full bg-yp-bright" /> PRODUCTOS DESTACADOS
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
