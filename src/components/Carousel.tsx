import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useCarouselImages } from '../hooks/useCarouselImages';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselSkeleton from './CarouselSkeleton';
import CarouselError from './CarouselError';
import CarouselEmpty from './CarouselEmpty';

const Carousel: React.FC = () => {
  const {data, isLoading, isError, error} = useCarouselImages();
  const carouselImages = data?.carouselImages || [];

  if (isLoading) return <CarouselSkeleton />;

  if (isError) return <CarouselError message={error.message} />

  if (carouselImages.length === 0) return <CarouselEmpty />;

  return (
    <div className="w-screen overflow-hidden">
     <Swiper
        aria-label='Carrusel de imagenes'
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full"
        role="region"
      >
        {carouselImages
        .filter((image): image is string => typeof image === 'string' && image.trim() !== '')
        .map((image, index) => (
          <SwiperSlide 
            key={image}
            role="group"
            aria-label={`Imagen ${index + 1} de ${carouselImages.length}`}
          >
            <div className="relative aspect-[16/9] w-full 
                            max-h-[300px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]
                            rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Imagen destacada ${index + 1}`}
                width="1920"
                height="1080"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel; 