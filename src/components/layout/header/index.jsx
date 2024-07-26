import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(true);
    const navigate = useNavigate();

    return (
        <div className='flex h-80 w-full items-center px-10 shadow-custom-dark'>
            <div className='mx-auto flex h-48 w-[calc(100%-500px)] items-center justify-between wide:w-1400'>
                <div className='flex h-50 w-182 items-center' onClick={() => navigate('/home')}>
                    <div className='h-31 w-25'>
                        <img src='/images/potato.svg' className='h-auto w-full' alt='' />
                    </div>
                    <h1 className='ml-6 h-48 w-150 text-32 font-bold'>GitPotato</h1>
                </div>
                {user ? (
                    <div className='flex items-center justify-center gap-15'>
                        <p className='underline'>username</p>
                        <img src='/images/user.svg' alt='' />
                        <img
                            src='/images/setting.svg'
                            className='w-25 cursor-pointer'
                            alt=''
                            onClick={() => navigate('/setting')}
                        />
                    </div>
                ) : (
                    <button
                        className='flex h-44 w-200 items-center justify-between rounded-4 bg-primary px-15 font-bold text-white duration-200 hover:scale-105'
                        onClick={() => navigate('/signin')}
                    >
                        Start with GitHub
                        <img src='/images/iconGithub.svg' alt='' />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
