import Image from 'next/image';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Slider() {
    return (
        <Swiper className="slider" slidesPerView={1} navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
            <SwiperSlide>
                <Image src="/images/grocery-banner-img-one.jpg" width={670} height={201} layout="responsive" />
            </SwiperSlide>
            <SwiperSlide>
                <Image src="/images/grocery-banner-img-two.jpg" width={670} height={201} layout="responsive" />
            </SwiperSlide>
        </Swiper>
    );
}
