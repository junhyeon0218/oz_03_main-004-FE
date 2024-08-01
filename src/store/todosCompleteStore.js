import create from 'zustand';
import { todoAPI } from '../apis/api/todo';
import { refineCompletedTodos } from '../apis/services/calendarService';

const useCalendarStore = create((set) => ({
    completedCounts: {},
    fetchCalendarData: async (year, month) => {
        try {
            const response = await todoAPI.getMonthlyCompletionRate(year, month);
            const refinedData = refineCompletedTodos(response);
            set({ completedCounts: refinedData });
        } catch (error) {
            console.error('Failed to fetch calendar data:', error);
        }
    },
}));

export default useCalendarStore;
