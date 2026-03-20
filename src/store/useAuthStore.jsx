import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAdmin: false,
  user: null,
  userPlaylists: [],
  email: "",
  forgotPasswordToken: "",

  setUserData: (userData) =>
    set({
      user: userData,
      userPlaylists: userData?.createdPlaylists || [],
      isAdmin:
        userData?.roles?.some((role) => role.description === "Admin Role") ||
        false,
    }),

  setEmail: (email) => set({ email }),

  setForgotPasswordToken: (token) => set({ forgotPasswordToken: token }),

  reset: () =>
    set({
      isAdmin: false,
      user: null,
      userPlaylists: [],
    }),
}));
