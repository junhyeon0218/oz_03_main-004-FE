import { authInstance } from '../utils/instance';

export const baekjoonAPI = {
    getProfile: async () => {
        const { data } = await authInstance.get('/baekjoons/profile/');
        return data;
    },
};
