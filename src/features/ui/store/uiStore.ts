import { create } from "zustand";

type UiStore = {
  isSidebarOpen: boolean;
  selectedTaskId: string | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openTaskDetails: (taskId: string) => void;
  closeTaskDetails: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: true,
  selectedTaskId: null,

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  openTaskDetails: (taskId) => set({ selectedTaskId: taskId }),
  closeTaskDetails: () => set({ selectedTaskId: null }),
}));
