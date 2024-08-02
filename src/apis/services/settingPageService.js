import { authAPI } from '../api/auth';

export const settingPageService = {
    getUserProfile: async () => {
        try {
            const userProfileData = await authAPI.getProfile();
            return {
                nickname: userProfileData.nickname,
                baekjoonId: userProfileData.baekjoon_id,
            };
        } catch (error) {
            console.error('Error fetching User profile', error);
            throw error;
        }
    },
};
