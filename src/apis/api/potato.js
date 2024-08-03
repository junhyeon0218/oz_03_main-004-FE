import { authInstance } from '../utils/instance';

export const potatoAPI = {
    getAllPotatoTypes: async () => {
        const { data } = await authInstance.get('/potatoes/');
        return data;
    },

    getUserPotatoes: async () => {
        const { data } = await authInstance.get('/potatoes/collection/');
        return data;
    },

    updateUserPotato: async (potatoType) => {
        const { data } = await authInstance.patch('/potatoes/select/', { id: potatoType });
        return data;
    },
};
