import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate를 사용하기 위해 import
import iconGithub from '../../../public/iconGithub.svg';
import potato from '../../../public/potato.svg';
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 관리를 위해 js-cookie 라이브러리 사용

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate(); // navigate 초기화

    // useEffect(() => {
    //     // 자동 로그인 처리
    //     const refreshToken = Cookies.get('refreshToken'); //쿠키에서 리프레시 토큰 가져오기
    //     if (refreshToken) {
    //         axios
    //             .post('/api/refresh-token', { token: refreshToken }) //리프레시 토큰으로 엑세스 토큰 갱신 요청
    //             .then((response) => {
    //                 localStorage.setItem('accessToken', response.data.accessToken); //요청 성공시 새 엑세스 토큰 로컬스토리지 저장
    //                 navigate('/home'); // 자동 로그인 후 홈으로 이동
    //             })
    //             .catch((error) => {
    //                 console.error('자동 로그인 실패:', error); //에러 시 메세지 출력
    //             });
    //     }
    // }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        // axios
        //     //서버에 로그인 요청
        //     .post('/api/login', { email, password })
        //     .then((response) => {
        //         //로그인 성공시 서버로부터 받은 엑세스 토큰 및 리프레시 토큰 추출
        //         const { accessToken, refreshToken } = response.data;
        //         localStorage.setItem('accessToken', accessToken); //엑세스 토큰을 로컬스토리지에 저장
        //         Cookies.set('refreshToken', refreshToken, { expires: 7 }); //리프레시 토큰을 쿠키에 저장, 7일 동안 쿠키 유효, 기간은 후에 변경예정
        //         setError({ email: '', password: '', general: '' }); //에러메세지 초기화
        //         navigate('/home'); // 로그인 성공 후 홈으로 이동
        //     })
        //     .catch((error) => {
        //         setError({ ...error, general: 'Invalid email or password.' });
        //     });
    };

    return (
        <div className='relative m-auto flex min-h-screen flex-col items-center justify-center overflow-hidden'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex h-48 items-center justify-center'>
                    <img src='../../../public/potato.svg' className='h-42 w-32' />
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
                <button className='flex h-44 w-200 items-center justify-between rounded-4 bg-primary px-15 text-white'>
                    Start with GitHub <img src={iconGithub} alt='' />
                </button>
            </div>

            <img
                className='absolute bottom-[-200px] left-0 h-[807.53px] w-[650.28px] origin-top-left rotate-[26.15deg] opacity-20'
                src={potato}
                alt=''
            />
            <img
                className='absolute right-[-200px] top-300 h-[807.53px] w-[650.28px] origin-top-left rotate-[-44.08deg] opacity-20'
                src={potato}
                alt=''
            />
        </div>
    );
};

export default Signin;
