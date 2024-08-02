import { stackAPI } from '../api/stack';

export const stackService = {
    getAllStacks: async () => {
        try {
            const allStackData = await stackAPI.getAllStacks();
            return allStackData.map((stack) => ({
                id: stack.id,
                name: stack.name,
            }));
        } catch (error) {
            console.error('Error fetching all stacks:', error);
            throw error;
        }
    },

    getUserStacks: async () => {
        try {
            const userStackData = await stackAPI.getUserStacks();
            return userStackData.map((stack) => ({
                id: stack.id,
                stackId: stack.stack,
            }));
        } catch (error) {
            console.error('Error fetching user stacks:', error);
            throw error;
        }
    },
};
