import { create } from "zustand";
import { authAPI } from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("auth_token") || null,
  isAuthenticated: !!localStorage.getItem("auth_token"),

  register: async (data) => {
    try {
      const response = await authAPI.register(data);
      const { user, token } = response.data.data;
      localStorage.setItem("auth_token", token);
      set({ user, token, isAuthenticated: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (data) => {
    try {
      const response = await authAPI.login(data);
      const { user, token } = response.data.data;
      localStorage.setItem("auth_token", token);
      set({ user, token, isAuthenticated: true });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  setUser: (user) => set({ user }),
}));
