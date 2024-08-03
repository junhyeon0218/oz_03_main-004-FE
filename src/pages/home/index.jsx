import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Calendar from '../../components/shared/calendar';
import Info from '../../components/shared/info';
import Potato from '../../components/shared/potato';
import Stack from '../../components/shared/stack';
import Todo from '../../components/shared/todo';
import Collection from '../../components/shared/collection';
import Level from '../../components/shared/level';
import { ChangePotatoModal, PotatoInfoModal, UserUpdateModal } from '../../components/modal/index';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../apis/api/auth';
import useUser from '../../store/userStore';
import usePotatoStore from '../../store/usePotatoStore';

const Home = () => {
    const [isChangePotatoModalOpen, setIsChangePotatoModalOpen] = useState(false);
    const [isPotatoInfoModalOpen, setIsPotatoInfoModalOpen] = useState(false);
    const [isUserUpdateModal, setIsUserUpdateModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [confirmedImage, setConfirmedImage] = useState(null);
    const [isOverlayed, setIsOverlayed] = useState(false);

    const setUser = useUser((state) => state.setUser);
    const { fetchUserPotatoes } = usePotatoStore();
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const userData = await authAPI.getProfile();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            navigate('/landing');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [setUser]);

    useEffect(() => {
        setIsUserUpdateModal(true);
        fetchUserPotatoes();
    }, [fetchUserPotatoes]);

    const handleSelectImage = (image, isOverlayed) => {
        setSelectedImage(image);
        setIsOverlayed(isOverlayed);
        setIsPotatoInfoModalOpen(true);
    };

    const handleConfirmChange = async (image) => {
        try {
            setConfirmedImage(image);
            setIsChangePotatoModalOpen(false);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handlePotatoInfoModalOkClick = () => {
        setIsPotatoInfoModalOpen(false);
        if (!isOverlayed) {
            setIsChangePotatoModalOpen(true);
        }
    };

    const handlePotatoInfoModalClose = () => {
        setIsPotatoInfoModalOpen(false);
    };

    return (
        <div className='flex h-[calc(100vh-80px)] w-full flex-col gap-5 px-10 py-20'>
            <div className='mx-auto flex h-1/3 w-[calc(100%-500px)] items-start gap-30 hwide:h-270 wide:w-1400 middle:w-[calc(100%-250px)] tablet:mx-auto tablet:min-h-700 tablet:w-full tablet:flex-wrap tablet:justify-between tablet:gap-0 tablet:px-10'>
                <div className='h-full w-1/4 rounded-4 p-24 shadow-custom-dark tablet:h-[calc(50%-10px)] tablet:w-[calc(50%-10px)] tablet:p-12'>
                    <Potato selectedImage={confirmedImage} />
                </div>
                <div className='flex h-full w-1/4 items-center justify-center rounded-4 p-24 shadow-custom-dark tablet:h-[calc(50%-10px)] tablet:w-[calc(50%-10px)] tablet:p-12'>
                    <Level />
                </div>
                <div className='h-full w-1/4 rounded-4 p-24 shadow-custom-dark tablet:h-[calc(50%-10px)] tablet:w-[calc(50%-10px)] tablet:p-12'>
                    <Info />
                </div>
                <div className='h-full w-1/4 rounded-4 p-24 shadow-custom-dark tablet:h-[calc(50%-10px)] tablet:w-[calc(50%-10px)] tablet:p-12'>
                    <Stack />
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={110}
                slidesPerView={1}
                navigation
                className='mx-auto mt-20 flex h-2/3 w-[calc(100%-300px)] grow px-100 wide:w-1550 wide:px-75 middle:w-[calc(100%-150px)] middle:px-50 tablet:m-0 tablet:w-full tablet:px-12'
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
                    <Collection onSelectImage={handleSelectImage} />
                </SwiperSlide>
            </Swiper>
            <PotatoInfoModal
                isOpen={isPotatoInfoModalOpen}
                onClose={handlePotatoInfoModalClose}
                onOk={handlePotatoInfoModalOkClick}
                selectedImage={selectedImage}
                isOverlayed={isOverlayed}
            />
            <ChangePotatoModal
                isOpen={isChangePotatoModalOpen}
                onClose={() => setIsChangePotatoModalOpen(false)}
                selectedImage={selectedImage}
                onConfirm={handleConfirmChange}
            />
            <UserUpdateModal
                isOpen={isUserUpdateModal}
                onClose={() => {
                    setIsUserUpdateModal(false);
                }}
            />
        </div>
    );
};

export default Home;
