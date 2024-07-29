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

    useEffect(() => {
        // 로컬 저장소에서 최신 커밋 갯수를 불러옴
        const latestCommitCount = localStorage.getItem('latestCommitCount');
        setLatestCommitCount(Number(latestCommitCount) || 0);

        // 로컬 저장소에서 이전 레벨을 불러옴
        const previousLevel = localStorage.getItem('previousLevel');
        setPreviousLevel(Number(previousLevel) || 0);

        // 로컬 저장소에서 이전 감자 상태를 불러옴
        const storedPreviousPotatoState = JSON.parse(localStorage.getItem('previousPotatoState') || '[]');
        setPreviousPotatoState(storedPreviousPotatoState);

        // 서버에서 최신 커밋 갯수를 받아옴
        axios
            .get('/api/githubs/commits')
            .then((response) => {
                const fetchedCommitCount = response.data.total_commit_count;

                const commitDifference = fetchedCommitCount - Number(latestCommitCount);
                setCommitDifference(commitDifference);

                localStorage.setItem('latestCommitCount', fetchedCommitCount);
            })
            .catch((error) => {
                console.error(error);
            });

        // 서버에서 (최신) 현재 레벨을 불러옴
        axios
            .get('/api/levels/current')
            .then((response) => {
                const fetchedCurrentLevel = response.data.currentLevel;
                setCurrentLevel(fetchedCurrentLevel);

                // 현재 레벨을 로컬 저장소에 previousLevel로 저장
                localStorage.setItem('previousLevel', fetchedCurrentLevel);

                if (previousLevel < currentLevel) {
                    setLevelupAlert(true);
                } else {
                    setLevelupAlert(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        // 서버에서 감자 정보를 불러옴
        axios
            .get('/potatoes/collection')
            .then((response) => {
                const fetchedPotatoState = response.data;
                setCurrentPotatoState(fetchedPotatoState);

                // 이전 상태와 현재 상태를 비교하여 is_acquired 변화 감지
                const acquiredChanged = fetchedPotatoState.some((potato, index) => {
                    const previousPotato = storedPreviousPotatoState.find((p) => p.id === potato.id);
                    return previousPotato && !previousPotato.is_acquired && potato.is_acquired;
                });

                // 변화가 감지되면 알림을 설정
                if (acquiredChanged) {
                    setShowAcquiredNotification(true);
                }

                // 현재 상태를 로컬 저장소에 저장
                localStorage.setItem('previousPotatoState', JSON.stringify(fetchedPotatoState));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex h-626 w-620 animate-slide-up flex-col items-center'>
                <div
                    className='animate-scaleUp mb-[-10px] h-118 w-full bg-opacity-70 bg-cover bg-top text-center'
                    style={{ backgroundImage: "url('/images/levelup.svg')" }}
                >
                    <div className='text-outline my-10 text-64 font-bold tracking-wide text-basic'>
                        {(levelupAlert && 'Welcome Back!') || 'Level UP!'}
                    </div>
                </div>
                <div className='flex h-540 w-full flex-col items-center justify-around bg-white'>
                    <h1 className='mt-10 text-24 font-bold text-strong'>
                        {(levelupAlert && `We've Got Some Updates for You`) || 'Congratulations'}
                    </h1>
                    {(levelupAlert && (
                        <div className='h-39'>
                            <span className='mr-5 text-20 font-bold text-strong'>{commitDifference}</span>
                            <span className='text-16 text-primary'>commits added to your XP!</span>
                        </div>
                    )) || <div className='hidden'></div>}

                    <div className='bg-fa mb-10 flex h-60 w-453 items-center justify-center rounded-10 border border-strong'>
                        <span className='text-23 font-bold text-strong'>{previousLevel}레벨</span>
                        <img src='/images/right-arrow.svg' alt='' className='mx-23 h-24 w-24 text-strong' />
                        <span className='text-23 font-bold text-strong'>{currentLevel}레벨</span>
                    </div>

                    <div className='h-268 w-573 overflow-hidden rounded-10 border border-strong scrollbar-hide'>
                        <div className='flex justify-center rounded-10 bg-white py-13'>
                            <img src='/images/star-icon.svg' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <img src='/images/star-icon.svg' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <span className='mx-20 text-23 font-bold text-strong'>New Potato</span>
                            <img src='/images/star-icon.svg' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
                            <img src='/images/star-icon.svg' alt='' className='mx-3 h-31 w-31 animate-twinkle' />
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
                                        <div className='flex h-190 w-170 flex-shrink-0 flex-col items-center justify-center rounded-4 border shadow-custom-light'>
                                            <img
                                                src={`/images/${potato.name}.svg`}
                                                alt=''
                                                className='h-118 w-85 object-cover'
                                            />
                                            <p className='my-5 text-primary'>{potato.name}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )) || (
                            <div className='flex w-full justify-center justify-items-center bg-white'>
                                <p className='mt-70 text-center text-14 text-gray-98'>
                                    No new potatoes at the moment..!
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className='mb-10 h-33 w-70 rounded-4 bg-primary px-10 py-5 text-14 text-white duration-200 hover:scale-105'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserUpdateModal;
