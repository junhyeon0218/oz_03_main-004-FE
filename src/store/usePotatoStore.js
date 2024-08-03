import { create } from 'zustand';
import { collectionService } from '../apis/services/collectionService';

const usePotatoStore = create((set, get) => ({
    userPotatoes: [],

    fetchUserPotatoes: async () => {
        try {
            const potatoes = await collectionService.getUserPotatoes();
            set({ userPotatoes: potatoes });
        } catch (error) {
            console.error('Error fetching user potatoes:', error);
        }
    },

    selectPotato: async (potatoType) => {
        try {
            const { userPotatoes } = get();
            const updatedPotatoes = userPotatoes.map((potato) => {
                // Normalize both values for comparison if they are strings
                const normalizedPotatoType = String(potatoType).trim().toLowerCase();
                const normalizedPotatoTypeInData = String(potato.type).trim().toLowerCase();

                return normalizedPotatoTypeInData === normalizedPotatoType
                    ? { ...potato, isSelected: true }
                    : { ...potato, isSelected: false };
            });

            const response = await collectionService.updateSelectedPotato(potatoType);
            set({ userPotatoes: updatedPotatoes });
        } catch (error) {
            console.error('Error updating selected potato:', error);
        }
    },
}));

export default usePotatoStore;
