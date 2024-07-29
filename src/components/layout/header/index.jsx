import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(true);
    const navigate = useNavigate();

    return (
        <div className='flex items-center w-full px-10 h-80 shadow-custom-dark'>
            <div className='mx-auto flex h-48 w-[calc(100%-500px)] items-center justify-between wide:w-1400'>
                <div className='flex items-center h-50 w-182' onClick={() => navigate('/home')}>
                    <div className='h-31 w-25'>
                        <img src='/images/potato.svg' className='w-full h-auto' alt='' />
                    </div>
                    <h1 className='h-48 ml-6 font-bold w-150 text-32'>GitPotato</h1>
                </div>
                {user ? (
                    <div className='flex items-center justify-center gap-15'>
                        <p className='underline'>username</p>
                        <img src='/images/user.svg' alt='' />
                        <img
                            src='/images/setting.svg'
                            className='cursor-pointer w-25'
                            alt=''
                            onClick={() => navigate('/setting')}
                        />
                    </div>
                ) : (
                    <button
                        className='flex items-center justify-between font-bold text-white duration-200 h-44 w-200 rounded-4 bg-primary px-15 hover:scale-105'
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
