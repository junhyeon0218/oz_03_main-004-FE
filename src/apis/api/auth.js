import { baseInstance, authInstance } from '../utils/instance';

export const authAPI = {
    login: async () => {
        const { data } = await baseInstance.post('/accounts/github/login/');
        return data;
    },

    getProfile: async () => {
        const { data } = await authInstance.get('/accounts/profile/');
        return data;
    },

    updateBaekjoonId: async (baekjoonId) => {
        const { data } = await authInstance.put('/accounts/baekjoon_id/', { baekjoon_id: baekjoonId });
        return data;
    },

    updateNickname: async (nickname) => {
        const { data } = await authInstance.put('/accounts/nickname/', { nickname });
        return data;
    },
};
