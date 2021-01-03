import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Slider({ items, breakpoints }) {
    return (
        <Swiper
            className="slider"
            navigation
            // slidesPerView="auto"
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={breakpoints}
        >
            {items.map((item, idx) => (
                <SwiperSlide key={idx}>{item}</SwiperSlide>
            ))}
        </Swiper>
    );
}
