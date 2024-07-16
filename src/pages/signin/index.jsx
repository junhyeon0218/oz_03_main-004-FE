import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate를 사용하기 위해 import
import FormInput from '../../components/common/input/index';
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 관리를 위해 js-cookie 라이브러리 사용

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', general: '' });
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate(); // navigate 초기화

    useEffect(() => {
        // 자동 로그인 처리
        const refreshToken = Cookies.get('refreshToken'); //쿠키에서 리프레시 토큰 가져오기
        if (refreshToken) {
            axios
                .post('/api/refresh-token', { token: refreshToken }) //리프레시 토큰으로 엑세스 토큰 갱신 요청
                .then((response) => {
                    localStorage.setItem('accessToken', response.data.accessToken); //요청 성공시 새 엑세스 토큰 로컬스토리지 저장
                    navigate('/home'); // 자동 로그인 후 홈으로 이동
                })
                .catch((error) => {
                    console.error('자동 로그인 실패:', error);
                });
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            //서버에 로그인 요청
            .post('/api/login', { email, password })
            .then((response) => {
                //로그인 성공시 서버로부터 받은 엑세스 토큰 및 리프레시 토큰 추출
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken); //엑세스 토큰을 로컬스토리지에 저장
                Cookies.set('refreshToken', refreshToken, { expires: 7 }); //리프레시 토큰을 쿠키에 저장, 7일 동안 쿠키 유효, 기간은 후에 변경예정
                setError({ email: '', password: '', general: '' }); //에러메세지 초기화
                navigate('/home'); // 로그인 성공 후 홈으로 이동
            })
            .catch((error) => {
                setError({ ...error, general: 'Invalid email or password.' });
            });
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen m-auto'>
            {/* 제목과 설명 */}
            <div className='flex items-center justify-center h-48'>
                <img src='../../../public/potato.svg' className='w-32 h-42' />
                <h1
                    className='h-auto mr-6 font-bold cursor-pointer text-48 text-strong'
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    GitPotato
                </h1>
            </div>
            <p className='h-24 font-normal my-36 text-20'>"Sign Up and Grow Your Potato!"</p>
            {/* 로그인 폼 */}
            <form className='flex flex-col justify-center' onSubmit={handleLogin}>
                {/* 이메일 입력 필드 */}
                <FormInput
                    id='userEmail'
                    label='Email'
                    type='email'
                    placeholder='Please Enter Your Email'
                    error={error.email}
                    setError={(errorMsg) => setError({ ...error, email: errorMsg })}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    isFormValid={isFormValid}
                    setIsFormValid={setIsFormValid}
                />
                {/* 비밀번호 입력 필드 */}
                <FormInput
                    id='loginPassword'
                    label='Password'
                    type='password'
                    placeholder='Please Enter Your Password'
                    error={error.password}
                    setError={(errorMsg) => setError({ ...error, password: errorMsg })}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    isFormValid={isFormValid}
                    setIsFormValid={setIsFormValid}
                />
                {/* 로그인 버튼 */}
                <button className='justify-center w-full mt-4 text-white rounded h-50 bg-gray-db' type='submit'>
                    Sign In
                </button>
            </form>
            {/* 에러 메시지 */}
            {error.general && <p className='mt-4 text-15 text-red'>{error.general}</p>}
            {/* 추가 링크와 버튼 */}
            <div className='my-24 text-center'>
                <p className='mb-6'>
                    Not a member? &nbsp;
                    <a href='/signup' className='underline text-blue hover:text-blue'>
                        Sign up
                    </a>
                </p>
                <p className='mt-24 mb-13'>Sign in with GitHub</p>
                <a href='https://github.com/login'>
                    <img
                        src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                        alt='GitHub Logo'
                        className='w-47.164 inline-block h-46'
                    />
                </a>
            </div>
        </div>
    );
};

export default Signin;
