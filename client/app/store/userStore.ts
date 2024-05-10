import create from "zustand";

interface UserStore {
    user: { email: string; _key: string; name: string };
    setUser: (user: string) => void;
}

export const userStore = create((set) => ({
    user: 0,
    setUser: (user: string) => set({ user }),
}));
