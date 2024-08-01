import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// 더미 (삭제예정))
const potatoes = [
    { id: 1, name: 'levelOnePotato' },
    { id: 2, name: 'levelTwoPotato' },
    { id: 3, name: 'levelThreePotato' },
    { id: 4, name: 'levelFourPotato' },
    { id: 5, name: 'winterPotato' },
    { id: 6, name: 'shPotato' },
];

const UserUpdateModal = ({ isOpen, onClose }) => {
    const [latestCommitCount, setLatestCommitCount] = useState(0);
    const [commitDifference, setCommitDifference] = useState(0);
    const [previousLevel, setPreviousLevel] = useState(1);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [previousPotatoState, setPreviousPotatoState] = useState([]);
    const [currentPotatoState, setCurrentPotatoState] = useState([]);
    const [showAcquiredNotification, setShowAcquiredNotification] = useState(false);
    const [levelupAlert, setLevelupAlert] = useState(false);

    // useEffect(() => {
    //     // 로컬 저장소에서 최신 커밋 갯수를 불러옴
    //     const latestCommitCount = localStorage.getItem('latestCommitCount');
    //     setLatestCommitCount(Number(latestCommitCount) || 0);

    //     // 로컬 저장소에서 이전 레벨을 불러옴
    //     const previousLevel = localStorage.getItem('previousLevel');
    //     setPreviousLevel(Number(previousLevel) || 0);

    //     // 로컬 저장소에서 이전 감자 상태를 불러옴
    //     const storedPreviousPotatoState = JSON.parse(localStorage.getItem('previousPotatoState') || '[]');
    //     setPreviousPotatoState(storedPreviousPotatoState);

    //     // 서버에서 최신 커밋 갯수를 받아옴
    //     axios
    //         .get('/api/githubs/commits')
    //         .then((response) => {
    //             const fetchedCommitCount = response.data.total_commit_count;

    //             const commitDifference = fetchedCommitCount - Number(latestCommitCount);
    //             setCommitDifference(commitDifference);

    //             localStorage.setItem('latestCommitCount', fetchedCommitCount);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });

    //     // 서버에서 (최신) 현재 레벨을 불러옴
    //     axios
    //         .get('/api/levels/current')
    //         .then((response) => {
    //             const fetchedCurrentLevel = response.data.currentLevel;
    //             setCurrentLevel(fetchedCurrentLevel);

    //             // 현재 레벨을 로컬 저장소에 previousLevel로 저장
    //             localStorage.setItem('previousLevel', fetchedCurrentLevel);

    //             if (previousLevel < currentLevel) {
    //                 setLevelupAlert(true);
    //             } else {
    //                 setLevelupAlert(false);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });

    //     // 서버에서 감자 정보를 불러옴
    //     axios
    //         .get('/potatoes/collection')
    //         .then((response) => {
    //             const fetchedPotatoState = response.data;
    //             setCurrentPotatoState(fetchedPotatoState);

    //             // 이전 상태와 현재 상태를 비교하여 is_acquired 변화 감지
    //             const acquiredChanged = fetchedPotatoState.some((potato, index) => {
    //                 const previousPotato = storedPreviousPotatoState.find((p) => p.id === potato.id);
    //                 return previousPotato && !previousPotato.is_acquired && potato.is_acquired;
    //             });

    //             // 변화가 감지되면 알림을 설정
    //             if (acquiredChanged) {
    //                 setShowAcquiredNotification(true);
    //             }

    //             // 현재 상태를 로컬 저장소에 저장
    //             localStorage.setItem('previousPotatoState', JSON.stringify(fetchedPotatoState));
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex flex-col items-center h-626 w-620 animate-slide-up'>
                <div
                    className='animate-scaleUp mb-[-10px] h-118 w-full bg-opacity-70 bg-cover bg-top text-center'
                    style={{ backgroundImage: "url('/images/levelup.png')" }}
                >
                    <div className='my-10 font-bold tracking-wide text-outline text-64 text-basic'>
                        {(levelupAlert && 'Welcome Back!') || 'Level UP!'}
                    </div>
                </div>
                <div className='flex flex-col items-center justify-around w-full bg-white h-540'>
                    <h1 className='mt-10 font-bold text-24 text-strong'>
                        {(levelupAlert && `We've Got Some Updates for You`) || 'Congratulations'}
                    </h1>
                    {(levelupAlert && (
                        <div className='h-39'>
                            <span className='mr-5 font-bold text-20 text-strong'>{commitDifference}</span>
                            <span className='text-16 text-primary'>commits added to your XP!</span>
                        </div>
                    )) || <div className='hidden'></div>}

                    <div className='flex items-center justify-center mb-10 border bg-fa h-60 w-453 rounded-10 border-strong'>
                        <span className='font-bold text-23 text-strong'>{previousLevel}레벨</span>
                        <img src='/images/right-arrow.png' alt='' className='w-24 h-24 mx-23 text-strong' />
                        <span className='font-bold text-23 text-strong'>{currentLevel}레벨</span>
                    </div>

                    <div className='overflow-hidden border h-268 w-573 rounded-10 border-strong scrollbar-hide'>
                        <div className='flex justify-center bg-white rounded-10 py-13'>
                            <img src='/images/star-icon.png' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <img src='/images/star-icon.png' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <span className='mx-20 font-bold text-23 text-strong'>New Potato</span>
                            <img src='/images/star-icon.png' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <img src='/images/star-icon.png' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                        </div>
                        {(showAcquiredNotification && (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                grabCursor={true}
                                slidesPerView={3}
                                spaceBetween={10}
                                autoplay={{ delay: 1500, disableOnInteraction: false }}
                                loop={true}
                                className='w-full bg-white'
                            >
                                {potatoes.map((potato, index) => (
                                    <SwiperSlide key={index} className='flex items-center justify-center'>
                                        <div className='flex flex-col items-center justify-center flex-shrink-0 border h-190 w-170 rounded-4 shadow-custom-light'>
                                            <img
                                                src={`/images/${potato.name}.png`}
                                                alt=''
                                                className='object-cover h-118 w-85'
                                            />
                                            <p className='my-5 text-primary'>{potato.name}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )) || (
                            <div className='flex justify-center w-full bg-white justify-items-center'>
                                <p className='text-center mt-70 text-14 text-gray-98'>
                                    No new potatoes at the moment..!
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className='px-10 py-5 mb-10 text-white duration-200 h-33 w-70 rounded-4 bg-primary text-14 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserUpdateModal;
