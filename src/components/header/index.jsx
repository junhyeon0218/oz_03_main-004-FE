import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex h-100 w-full items-center px-10 shadow-custom-dark'>
            <div className='mx-auto flex h-48 w-[calc(100%-500px)] justify-between wide:w-1400'>
                <div>
                    <h1 className='h-48 w-150 text-32 font-bold'>GitPotato</h1>
                </div>
                {user ? (
                    <div>프로필</div>
                ) : (
                    <div className='flex'>
                        <button
                            className='h-44 w-90 rounded-4 bg-primary font-bold text-white duration-200 hover:scale-105'
                            onClick={() => navigate('/signin')}
                        >
                            Sign In
                        </button>
                        <button
                            className='ml-25 h-44 w-90 rounded-4 border-1 border-primary font-bold text-primary duration-200 hover:scale-105'
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
