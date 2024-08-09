import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Make sure this is imported for autoplay functionality
import { Keyboard, Pagination, Autoplay } from 'swiper/modules';
import './styles.css';
import Category from './Category';
import axios from 'axios';

const SliderWithProducts = () => {
    const [slides, setSlides] = useState([]);
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL; // Make sure this is correctly defined in .env

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/get-all-main-banner`);
            const data = res.data.data;
            const filter = data.filter((item) => item.active)
            // console.log(filter)
            setSlides(filter);
        } catch (error) {
            console.error("Error fetching slides:", error); // Improved error logging
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div className='w-full bg-blue-500 p-2 h-[75vh]'>
            <div className='main-div flex flex-col lg:flex-row h-full lg:h-auto'>
                <div className='w-full  h-full'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        keyboard={{
                            enabled: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Keyboard, Pagination, Autoplay]}
                        className="mySwiper h-full"
                    >
                        {slides.map((item, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={item.image.url} // Updated to `item.img` based on data structure
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                    style={{ maxHeight: '75vh' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* <div className='w-full hidden lg:w-1/4 lg:block'>
                    <Category />
                </div> */}
            </div>
        </div>
    );
}

export default SliderWithProducts;
