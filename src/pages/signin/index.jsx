import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate를 사용하기 위해 import
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 관리를 위해 js-cookie 라이브러리 사용

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate(); // navigate 초기화

    const handleGitHubLogin = () => {
        window.location.href = import.meta.env.VITE_APP_OAUTH_URL;
    };

    return (
        <div className='relative flex flex-col items-center justify-center min-h-screen m-auto overflow-hidden'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center h-48'>
                    <img src='/images/potato.png' className='w-32 h-42' />
                    <h1
                        className='h-auto ml-6 font-bold cursor-pointer text-48 text-strong'
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        GitPotato
                    </h1>
                </div>
                <p className='h-24 font-normal my-36 text-20'>"Continew and Grow Your Potato!"</p>
                <button
                    onClick={handleGitHubLogin}
                    className='flex items-center justify-between text-white h-44 w-200 rounded-4 bg-primary px-15'
                >
                    Start with GitHub <img src='/images/iconGithub.png' alt='' />
                </button>
            </div>

            <img
                className='absolute bottom-[-200px] left-0 h-[807.53px] w-[650.28px] origin-top-left rotate-[26.15deg] opacity-20'
                src='/images/potato.png'
                alt=''
            />
            <img
                className='absolute right-[-200px] top-300 h-[807.53px] w-[650.28px] origin-top-left rotate-[-44.08deg] opacity-20'
                src='/images/potato.png'
                alt=''
            />
        </div>
    );
};

export default Signin;
