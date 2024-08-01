import { authInstance } from '../utils/instance';

export const githubAPI = {
    getCommits: async () => {
        const { data } = await authInstance.get('/githubs/');
        return data;
    },
};
