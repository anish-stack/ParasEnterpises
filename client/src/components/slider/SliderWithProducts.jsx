import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination ,Autoplay} from 'swiper/modules';
import './styles.css';
import Category from './Category';
import 'swiper/css/autoplay';
const SliderWithProducts = () => {
    const data = [
        {
            img: "https://m.media-amazon.com/images/I/51q2x97C4KL._AC_UF894,1000_QL80_.jpg"
        },
        {
            img: "https://m.media-amazon.com/images/I/61uIMesuscL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            img: "https://m.media-amazon.com/images/I/61W-Kg4tkHL._AC_UF1000,1000_QL80_.jpg"
        }
    ];

    return (
        <div className='w-full bg-blue-500 p-2 h-[75vh]'>
            <div className='main-div flex flex-col lg:flex-row  h-full lg:h-auto'>
            <div className='w-full lg:w-3/4 h-full'>
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
                        modules={[Keyboard, Pagination,Autoplay]}
                        className="mySwiper h-full"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={item.img}
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                    style={{ maxHeight: '75vh' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='w-full hidden lg:w-1/4 lg:block'>
                    <Category/>
                </div>
            </div>
        </div>
    );
}

export default SliderWithProducts;
