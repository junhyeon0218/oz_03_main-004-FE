import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { githubAPI } from '../../../apis/api/github';
import Loading from '../../common/loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const DUMMY_DATA = {
    today_commit_count: 0,
    week_commit_count: 0,
    total_commit_count: 0,
    week_average_commit_count: 0,
};

const Info = () => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await githubAPI.getCommits();
            const formattedData = {
                'Today commits': data.today_commit_count,
                'Week commits': data.week_commit_count,
                'Total commits': data.total_commit_count,
                'Week average commits': data.week_average_commit_count,
            };
            setInfo(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching commits:', error);
            setInfo(DUMMY_DATA);
        } finally {
        }
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
            className='relative flex h-full w-300 items-center justify-center wide:w-200 tablet:w-full'
        >
            {Object.entries(info).map(([key, value]) => (
                <SwiperSlide key={key} className='bg-white'>
                    <div className='h-[calc(100%-30px)] w-full'>
                        <div className='flex h-full flex-col items-center justify-center'>
                            <p className='text-21 font-bold wide:text-16'>{key}</p>
                            <div className='flex grow items-center justify-center'>
                                <p className='text-32 font-bold wide:text-24'>{value}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            {loading && <Loading />}
        </Swiper>
    );
};

export default Info;
