import { create } from 'zustand';
import { authAPI } from '../apis/api/auth';

const useUser = create((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
}));

export default useUser;
