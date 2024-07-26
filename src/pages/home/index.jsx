import React, { useState } from 'react';
import axios from 'axios';
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
import ChangePotatoModal from '../../components/modal/ChangePotatoModal';
import NewPotatoEarnedModal from '../../components/modal/NewPotatoEarnedModal';
import PotatoInfoModal from '../../components/modal/PotatoInfoModal';

const Home = () => {
    const [isNewPotatoEarnedModalOpen, setIsNewPotatoEarnedModalOpen] = useState(false);
    const [isChangePotatoModalOpen, setIsChangePotatoModalOpen] = useState(false);
    const [isPotatoInfoModalOpen, setIsPotatoInfoModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 초기화
    const [confirmedImage, setConfirmedImage] = useState(null); // 확정된 이미지 초기화

    // 이미지 선택 시
    const handleSelectImage = (image) => {
        setSelectedImage(image); // 선택된 이미지를 상태에 저장
        setIsChangePotatoModalOpen(true);
    };
    // ChangePotatoModal 모달에서 OK 버튼 클릭 시 서버에 이미지 정보를 여기서 저장
    const handleConfirmChange = async (image) => {
        setConfirmedImage(image); // 이미지 상태를 업데이트

        // try {
        //     const response = await axios.post('/api/potato', { image });
        //     console.log('Image saved successfully');
        //     setConfirmedImage(image); // OK 버튼을 눌렀을 때만 이미지 상태를 업데이트합니다.
        // } catch (error) {
        //     console.error('Error saving image:', error);
        // }
    };

    // 새로운 감자 얻었을때 NewPotatoEarnedModal모달
    const handleGetNewPotato = () => {
        setIsNewPotatoEarnedModalOpen(true);
    };

    return (
        <div className='flex h-[calc(100vh-80px)] w-full flex-col gap-5 px-10 py-20'>
            <div className='mx-auto flex h-1/3 w-[calc(100%-500px)] gap-30 hwide:h-270 wide:w-1400'>
                <div className='aspect-6/5 h-full rounded-4 p-24 shadow-custom-dark'>
                    <Potato selectedImage={confirmedImage} /> {/* 확정된 이미지를 전달 */}
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
                    <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                        <Calendar />
                    </div>
                    <div className='h-full w-1/2 rounded-4 p-24 shadow-custom-dark'>
                        <Todo />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-full py-8'>
                    <Collection onSelectImage={handleSelectImage} /> {/* 이미지 선택 핸들러 전달 */}
                </SwiperSlide>
            </Swiper>

            <ChangePotatoModal
                isOpen={isChangePotatoModalOpen}
                onClose={() => setIsChangePotatoModalOpen(false)}
                selectedImage={selectedImage} // 선택된 이미지 전달
                onConfirm={handleConfirmChange} // 확인 버튼 클릭 확정 이미지 전달
            />
            {/* <NewPotatoEarnedModal
                isOpen={isNewPotatoEarnedModalOpen}
                onClose={() => setIsNewPotatoEarnedModalOpen(false)}
            /> */}
        </div>
    );
};

export default Home;
