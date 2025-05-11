import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetFeaturedProducts } from '../../hooks/useGetFeaturedProducts';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/pagination';

const FeaturedProductsCarousel: React.FC = () => {
  const { data: products, isLoading, error } = useGetFeaturedProducts();

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos</div>;
  if (!products?.length) return <div>No hay productos destacados</div>;
  console.log(products)

  return (
    <div className="w-full bg-white py-8">
      <div className="w-full px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
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
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
                slidesPerView: 5
            }
          }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className='py-4 px-9'>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel
