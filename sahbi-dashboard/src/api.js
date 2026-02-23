import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "" : "http://localhost:5000") + "/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (email, password) =>
  api.post("auth/login", { email, password });

// Admin - Users
export const getUsers = () => api.get("admin/users");
export const getUser = (id) => api.get(`admin/users/${id}`);
export const updateUser = (id, data) => api.put(`admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`admin/users/${id}`);
export const setUserRole = (id, role) =>
  api.patch(`admin/users/${id}/role`, { role });

// Admin - Events
export const getEvents = () => api.get("admin/events");
export const createEvent = (data) => api.post("admin/events", data);
export const updateEvent = (id, data) => api.put(`admin/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`admin/events/${id}`);

// Admin - Bookings
export const getBookings = () => api.get("admin/bookings");
export const updateBooking = (id, data) =>
  api.put(`admin/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`admin/bookings/${id}`);

// Admin - Chats
export const getChats = () => api.get("admin/chats");
export const getChat = (id) => api.get(`admin/chats/${id}`);
export const deleteChat = (id) => api.delete(`admin/chats/${id}`);
