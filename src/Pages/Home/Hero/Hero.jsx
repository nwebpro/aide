import React from 'react';
import slider1 from '../../../assets/images/heroSlider/slider1.webp'
import slider2 from '../../../assets/images/heroSlider/slider2.webp'
import slider3 from '../../../assets/images/heroSlider/slider3.webp'
import slider4 from '../../../assets/images/heroSlider/slider4.webp'
import slider5 from '../../../assets/images/heroSlider/slider5.webp'
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
// import required modules
import { Autoplay, Pagination } from "swiper";

const sliderdata = [
    {
        image: slider1
    },
    {
        image: slider2
    },
    {
        image: slider3
    },
    {
        image: slider4
    },
    {
        image: slider5
    }
]

const Hero = () => {
    return (
        <section className='container mx-auto py-3'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    sliderdata.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <img src={slide.image} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
};

export default Hero;