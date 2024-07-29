import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { getItem, setItem, removeItem } from '../../utils/storage';

const createAuthAPI = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
    });

    instance.interceptors.request.use(
        async (config) => {
            let token = getItem('access_token');

            if (!token) {
                throw new Error('No access token');
            }

            if (isTokenExpired(token)) {
                token = await refreshAccessToken();
                if (!token) {
                    logout();
                    throw new Error('Failed to refresh token');
                }
            }

            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export const authInstance = createAuthAPI();

export const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
}

async function refreshAccessToken() {
    try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await baseInstance.post('/accounts/token/refresh', { refreshToken });
        const newAccessToken = response.data.accessToken;

        setItem('access_token', newAccessToken);
        // 새로운 리프레시 토큰이 서버에서 전송된다면 이를 쿠키에 저장
        if (response.data.refreshToken) {
            Cookies.set('refresh_token', response.data.refreshToken, {
                expires: 7, // 7일 후 만료
                secure: true, // HTTPS에서만 사용
                sameSite: 'strict', // CSRF 방지
            });
        }

        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
}

function logout() {
    removeItem('access_token');
    Cookies.remove('refresh_token');
    window.location.href = '/landing';
}
