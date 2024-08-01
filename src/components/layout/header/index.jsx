import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../store/userStore';
import { getItem, setItem, removeItem } from '../../../utils/storage';

const Header = () => {
    const navigate = useNavigate();

    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const handleLogout = () => {
        // 세션 스토리지에서 액세스 토큰 삭제
        removeItem('accessToken');

        // 쿠키에서 리프레시 토큰 삭제
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // 유저 상태 초기화 (useUser 스토어를 사용한다고 가정)
        setUser(null);

        // 홈 페이지로 리다이렉트
        navigate('/landing');
    };

    return (
        <div className='flex h-80 w-full items-center px-10 shadow-custom-dark'>
            <div className='mx-auto flex h-48 w-[calc(100%-500px)] items-center justify-between wide:w-1400'>
                <div className='flex h-50 w-182 items-center' onClick={() => navigate('/home')}>
                    <div className='h-31 w-25'>
                        <img src='/images/potato.png' className='h-auto w-full' alt='' />
                    </div>
                    <h1 className='ml-6 h-48 w-150 text-32 font-bold'>GitPotato</h1>
                </div>
                {user ? (
                    <div className='flex items-center justify-center gap-15'>
                        <p className='underline'>{user.nickname}</p>
                        <img src={user.profile_url} className='w-40 rounded-full' alt='' />
                        <img
                            src='/images/setting.png'
                            className='w-25 cursor-pointer'
                            alt=''
                            onClick={() => navigate('/setting')}
                        />
                        <img src='/images/logout.png' onClick={handleLogout} className='w-25 cursor-pointer' alt='' />
                    </div>
                ) : (
                    <button
                        className='flex h-44 w-200 items-center justify-between rounded-4 bg-primary px-15 font-bold text-white duration-200 hover:scale-105'
                        onClick={() => navigate('/signin')}
                    >
                        Start with GitHub
                        <img src='/images/iconGithub.png' alt='' />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
