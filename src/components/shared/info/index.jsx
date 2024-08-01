import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const DUMMY_DATA = [
    { totalCommits: 205 },
    { todaysCommits: 12 },
    { lastCommitDay: '2024-07-19' },
    { last7DaysCommits: 52 },
    { avgCommitsDay: 8 },
];

const Info = () => {
    const [info, setInfo] = useState([]);

    const fetchData = async () => {
        // const data = await DUMMY_DATA;
        const data = DUMMY_DATA;
        setInfo(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Swiper
            modules={[Pagination, EffectFade, Autoplay]}
            grabCursor={true}
            effect={'fade'}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            pagination={{ dynamicBullets: true }}
            className='h-full w-300 wide:w-200 tablet:w-full'
        >
            {info.map((data, index) => (
                <SwiperSlide key={index} className='bg-white'>
                    <div className='h-[calc(100%-30px)] w-full'>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} className='flex flex-col items-center justify-center h-full'>
                                <p className='font-bold text-21 wide:text-16'>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </p>
                                <div className='flex items-center justify-center grow'>
                                    <p className='font-bold text-32 wide:text-24'>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Info;
