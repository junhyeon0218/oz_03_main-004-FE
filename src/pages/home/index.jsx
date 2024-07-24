import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Calendar from '../../components/shared/calendar';
import Info from '../../components/shared/info';
import Potato from '../../components/shared/potato';
import Stack from '../../components/shared/stack';
import Todo from '../../components/shared/todo';
import Collection from '../../components/shared/collection';

const Home = () => {
    return (
        <div className='flex h-[calc(100vh-100px)] w-full flex-col gap-5 overflow-y-auto px-10 py-20'>
            <div className='mx-auto flex h-1/3 w-[calc(100%-500px)] gap-30 wide:w-1400'>
                {/* 3 */}
                <div className='aspect-[6/5] h-full rounded-4 p-24 shadow-custom-dark'>
                    <Potato />
                </div>
                <div className='aspect-[12/5] h-full rounded-4 p-24 shadow-custom-dark'>
                    <Info />
                </div>
                <div className='h-full grow rounded-4 p-24 shadow-custom-dark'>
                    <Stack />
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                className='relative mx-auto mt-20 flex h-2/3 w-[calc(100%-250px)] wide:w-1650'
            >
                <SwiperSlide className='flex items-stretch justify-between px-100'>
                    {/* 1 */}
                    <div className='flex h-full w-full gap-30 px-24 py-5'>
                        <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                            <Calendar />
                        </div>
                        <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                            <Todo />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='overflow-y-auto px-100 scrollbar-hide'>
                    {/* 2 */}
                    <div className='flex w-full flex-col gap-20 px-24 py-5'>
                        <div className='w-full rounded-4'>
                            <Collection />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Home;
