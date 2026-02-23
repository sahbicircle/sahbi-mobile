import { create } from "zustand";

export const useChatStore = create((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
}));
