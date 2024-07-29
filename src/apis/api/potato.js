import { baseInstance, authInstance } from './instance';

export const potatoAPI = {
    getAllPotatoTypes: async () => {
        const { data } = await baseInstance.get('/potatoes');
        return data;
    },

    getUserPotatoes: async () => {
        const { data } = await authInstance.get('/potatoes/collection');
        return data;
    },

    updateUserPotato: async (potatoId) => {
        const { data } = await authInstance.patch('/potatoes/patch', { id: potatoId });
        return data;
    },
};
