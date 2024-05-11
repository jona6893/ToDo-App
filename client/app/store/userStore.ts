import { create } from "zustand";
import User from "../entities/User";
import Task from "../entities/Tasks";
interface UserStore {
  user: User[];
  setUser: (user: User[]) => void;
  tasks: Task[];
  setTask: (task: Task[]) => void;
}

const userStore = create<UserStore>((set) => ({
  //user store
  user: [] as User[],
  setUser: (user: User[]) => set({ user }),
  // task Store
  tasks: [] as Task[],
  setTask: (tasks: Task[]) => set({ tasks }),
}));

export default userStore;
