import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getItem, setItem, removeItem } from '../../utils/storage';

const createAuthAPI = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
    });

    instance.interceptors.request.use(
        async (config) => {
            let token = getItem('accessToken');

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/; secure; samesite=strict`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

async function refreshAccessToken() {
    try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await baseInstance.post('/accounts/token/refresh', { refreshToken });
        const newAccessToken = response.data.accessToken;

        setItem('access_token', newAccessToken);
        // 새로운 리프레시 토큰이 서버에서 전송된다면 이를 쿠키에 저장
        if (response.data.refreshToken) {
            setCookie('refresh_token', response.data.refreshToken, 7); // 7일 후 만료
        }

        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
}

function logout() {
    removeItem('access_token');
    deleteCookie('refresh_token');
    window.location.href = '/landing';
}
