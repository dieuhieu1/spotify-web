import { create } from "zustand";

// Only stores the currently selected item (artist/playlist) for play button state.
// All server data (songs, albums, etc.) now lives in TanStack Query cache.
export const useMusicStore = create((set) => ({
  current: null,
  setCurrent: (element) => set({ current: element }),
}));
