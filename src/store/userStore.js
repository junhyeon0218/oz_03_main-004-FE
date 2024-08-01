import { create } from 'zustand';

const useUser = create((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
}));

export default useUser;
