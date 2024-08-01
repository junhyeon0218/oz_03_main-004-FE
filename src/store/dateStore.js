import { create } from 'zustand';
import { format } from 'date-fns';

// 오늘 날짜를 'yyyy-MM-dd' 형식으로 포맷팅
const today = format(new Date(), 'yyyy-MM-dd');

const useDate = create((set) => ({
    selectedDate: today,
    setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useDate;
