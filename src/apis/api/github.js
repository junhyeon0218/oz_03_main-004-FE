import { authInstance } from './instance';

export const githubAPI = {
    getCommits: async () => {
        const { data } = await authInstance.get('/githubs/commits');
        return data;
    },
};
