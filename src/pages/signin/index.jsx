import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate를 사용하기 위해 import

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
        <div className='relative m-auto flex min-h-screen flex-col items-center justify-center overflow-hidden'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex h-48 items-center justify-center'>
                    <img src='/images/potato.png' className='h-42 w-32' />
                    <h1
                        className='ml-6 h-auto cursor-pointer text-48 font-bold text-strong'
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        GitPotato
                    </h1>
                </div>
                <p className='my-36 h-24 text-20 font-normal'>"Continew and Grow Your Potato!"</p>
                <button
                    onClick={handleGitHubLogin}
                    className='flex h-44 w-200 items-center justify-between rounded-4 bg-primary px-15 text-white'
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
