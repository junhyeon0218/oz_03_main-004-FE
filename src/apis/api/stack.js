import { authInstance } from '../utils/instance';

export const stackAPI = {
    getAllStacks: async () => {
        const { data } = await authInstance.get('/stacks/all/');
        return data;
    },

    getUserStacks: async () => {
        const { data } = await authInstance.get('/stacks/');
        return data;
    },

    createUserStack: async (stackId) => {
        const { data } = await authInstance.post(`/stacks/create/`, { stack_id: stackId });
        return data;
    },

    deleteUserStack: async (stackId) => {
        const { data } = await authInstance.delete(`/stacks/delete/${stackId}/`);
        return data;
    },
};
