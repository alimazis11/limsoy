import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
};

export const exerciseAPI = {
  getAll: (page = 1) => api.get(`/exercises?page=${page}`),
  getById: (id) => api.get(`/exercises/${id}`),
};

export const workoutPlanAPI = {
  getAll: (page = 1) => api.get(`/workout-plans?page=${page}`),
  create: (data) => api.post("/workout-plans", data),
  getById: (id) => api.get(`/workout-plans/${id}`),
  update: (id, data) => api.patch(`/workout-plans/${id}`, data),
  delete: (id) => api.delete(`/workout-plans/${id}`),
};

export const workoutLogAPI = {
  getAll: (page = 1, filters = {}) => {
    const params = new URLSearchParams({ page, ...filters });
    return api.get(`/workout-logs?${params}`);
  },
  create: (data) => api.post("/workout-logs", data),
};

export default api;
