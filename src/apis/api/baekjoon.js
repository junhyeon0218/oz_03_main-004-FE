import { authInstance } from './instance';

export const baekjoonAPI = {
    getProfile: async () => {
        const { data } = await authInstance.get('/baekjoons/profile');
        return data;
    },
};
