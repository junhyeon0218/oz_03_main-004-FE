import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/common/loading';
import useUser from '../../store/userStore';
import { getItem, setItem, removeItem } from '../../utils/storage';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useUser((state) => state.setUser);

    useEffect(() => {
        const handleCallback = () => {
            const urlParams = new URLSearchParams(location.search);
            const accessToken = urlParams.get('access_token');
            const refreshToken = urlParams.get('refresh_token');
            const userInfo = urlParams.get('user');

            if (accessToken && refreshToken && userInfo) {
                // 액세스 토큰을 sessionStorage에 저장
                setItem('accessToken', accessToken);

                // 리프레시 토큰을 쿠키에 저장 (30일 유효)
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
                document.cookie = `refreshToken=${refreshToken}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict${location.protocol === 'https:' ? '; Secure' : ''}`;

                const parsedUserInfo = JSON.parse(userInfo);
                setUser(parsedUserInfo[0]);

                console.log('Authentication successful');
                navigate('/home');
            } else {
                console.error('Missing token or user info');
                navigate('/signin');
            }
            setIsLoading(false);
        };

        handleCallback();
    }, [navigate, location]);

    if (isLoading) {
        return <Loading />;
    }

    return null; // 로딩이 끝나면 아무것도 렌더링하지 않음
};

export default OAuthCallback;
