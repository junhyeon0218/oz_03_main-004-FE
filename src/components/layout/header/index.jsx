import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconGithub from '../../../../public/iconGithub.svg';

const Header = () => {
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex h-80 w-full items-center px-10 shadow-custom-dark'>
            <div className='mx-auto flex h-48 w-[calc(100%-500px)] items-center justify-between wide:w-1400'>
                <div className='flex h-50 w-182 items-center'>
                    <div className='h-31 w-25'>
                        <img src='../../../public/potato.svg' className='h-auto w-full' alt='' />
                    </div>
                    <h1 className='ml-6 h-48 w-150 text-32 font-bold'>GitPotato</h1>
                </div>
                {user ? (
                    <div>프로필</div>
                ) : (
                    <button
                        className='flex h-44 w-200 items-center justify-between rounded-4 bg-primary px-15 font-bold text-white duration-200 hover:scale-105'
                        onClick={() => navigate('/signin')}
                    >
                        Start with GitHub
                        <img src={iconGithub} alt='' />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
