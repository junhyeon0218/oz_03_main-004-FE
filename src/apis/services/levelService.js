import { githubAPI } from '../api/github';

export const userLevelService = {
    getLevel: async () => {
        try {
            const userLevelData = await githubAPI.getCommits();
            return {
                level: userLevelData.level,
                exp: userLevelData.exp,
                nextLevelExp: userLevelData.next_level_exp,
            };
        } catch (error) {
            console.error('Error fetching commits:', error);
            throw error;
        }
    },
};
