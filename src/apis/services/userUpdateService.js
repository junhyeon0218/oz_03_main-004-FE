import { githubAPI } from '../api/github';
import { potatoAPI } from '../api/potato';

export const githubService = {
    getGithubState: async () => {
        try {
            const userGithubData = await githubAPI.getCommits();
            return {
                totalCommit: userGithubData.total_commit_count,
                level: userGithubData.level,
            };
        } catch (error) {
            console.error('Error fetching commits:', error);
            throw error;
        }
    },
};

export const potatoService = {
    getAllPotato: async () => {
        try {
            const allPotatoData = await potatoAPI.getAllPotatoTypes();
            return allPotatoData.map((potato) => ({
                potatoId: potato.id,
                potatoName: potato.potato_name,
            }));
        } catch (error) {
            console.error('Error fetching all potato types:', error);
            throw error;
        }
    },

    getUserPotatoes: async () => {
        try {
            const userPotatoData = await potatoAPI.getUserPotatoes();
            return userPotatoData.map((userPotato) => ({
                potatoTypeId: userPotato.potato_type,
                isAcquired: userPotato.is_acquired,
            }));
        } catch (error) {
            console.error('Error fetching user potatoes:', error);
            throw error;
        }
    },

    getUserPotatoDetails: async () => {
        try {
            const allPotatoes = await potatoService.getAllPotato();
            const userPotatoes = await potatoService.getUserPotatoes();

            const userPotatoDetails = userPotatoes.map((userPotato) => {
                const potatoInfo = allPotatoes.find((potato) => potato.potatoId === userPotato.potatoTypeId);
                return {
                    potatoId: userPotato.potatoTypeId,
                    potatoName: potatoInfo ? potatoInfo.potatoName : 'Unknown Potato',
                    isAcquired: userPotato.isAcquired,
                };
            });
            return userPotatoDetails;
        } catch (error) {
            console.error('Error fetching user potato details:', error);
            throw error;
        }
    },
};
