import { create } from 'zustand';

const potatoTypeStore = create((set) => ({
    isPotatoType: 0,
    setIsPotatoType: (type) => set({ isPotatoType: type }),
}));

export default potatoTypeStore;
