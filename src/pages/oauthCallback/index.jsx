import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/loading';
import Cookies from 'js-cookie';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const parseAndStoreData = () => {
            try {
                // JSON 데이터 파싱
                const data = JSON.parse(document.body.textContent);

                // 필요한 데이터 추출 및 저장
                if (data.access_token && data.refresh_token) {
                    // 엑세스 토큰을 세션 스토리지에 저장
                    sessionStorage.setItem('accessToken', data.access_token);

                    // 리프레시 토큰을 쿠키에 저장 (7일 유효)
                    Cookies.set('refreshToken', data.refresh_token, { expires: 30, secure: true, sameSite: 'strict' });

                    // 사용자 정보가 있다면 세션 스토리지에 저장
                    if (data.user) {
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                    }

                    // 홈페이지로 리다이렉트
                    navigate('/home');
                } else {
                    throw new Error('토큰 정보가 없습니다.');
                }
            } catch (error) {
                console.error('데이터 파싱 실패:', error);
                navigate('/signin'); // 실패 시 로그인 페이지로 이동
            } finally {
                setIsLoading(false);
            }
        };

        // 컴포넌트가 마운트된 후 데이터 파싱 실행
        parseAndStoreData();
    }, [navigate]);

    if (isLoading) {
        return <Loading />;
    }

    return null; // 로딩이 끝나면 아무것도 렌더링하지 않음 (이미 다른 페이지로 이동했을 것이기 때문)
};

export default OAuthCallback;
