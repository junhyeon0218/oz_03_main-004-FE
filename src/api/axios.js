import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL, // 서버의 기본 URL
    timeout: 5000, // 요청 제한 시간 (ms)
    headers: {
        'Content-Type': 'application/json',
    },
});

// 더미데이터 불러오는 api
export const fetchCompletedCounts = async (yearMonth) => {
    try {
        const response = await axiosInstance.get(`/completed-counts/${yearMonth}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching completed counts:', error);
        throw error;
    }
};

export const fetchTodosForDate = async (date) => {
    try {
        const response = await axiosInstance.get(`/todos/${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos for date:', error);
        throw error;
    }
};

// 추가적인 API 호출 함수들을 여기에 작성할 수 있습니다.

export default axiosInstance;
