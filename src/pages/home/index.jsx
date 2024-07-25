import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import Calendar from '../../components/shared/calendar';
import Info from '../../components/shared/info';
import Potato from '../../components/shared/potato';
import Stack from '../../components/shared/stack';
import Todo from '../../components/shared/todo';
import Collection from '../../components/shared/collection';
import Level from '../../components/shared/level';

const Home = () => {
    return (
        <div className='flex h-[calc(100vh-80px)] w-full flex-col gap-5 px-10 py-20'>
            <div className='mx-auto flex h-1/3 w-[calc(100%-500px)] gap-30 hwide:h-270 wide:w-1400'>
                {/* 3 */}
                <div className='aspect-6/5 h-full rounded-4 p-24 shadow-custom-dark'>
                    <Potato />
                </div>
                <div className='flex h-full grow items-center justify-between rounded-4 p-24 shadow-custom-dark'>
                    <Level />
                    <Info />
                </div>
                <div className='h-full min-w-400 max-w-550 grow rounded-4 p-24 shadow-custom-dark'>
                    <Stack />
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={110}
                slidesPerView={1}
                navigation
                className='relative mx-auto mt-20 flex h-2/3 w-[calc(100%-300px)] grow px-100 wide:w-1550 wide:px-75'
            >
                <SwiperSlide className='flex justify-between gap-30 py-8'>
                    {/* 1 */}
                    <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                        <Calendar />
                    </div>
                    <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                        <Todo />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-full py-8'>
                    {/* 2 */}

                    <Collection />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Home;
