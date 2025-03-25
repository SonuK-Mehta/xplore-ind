import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (userData) => api.post("/login", userData);
export const getUserProfile = () => api.get("/profile");

// Dashboard APIs
export const createPlace = (placeData) => api.post("/dashboard", placeData);
export const getUserDashboard = () => api.get("/dashboard");
export const getPlaceById = (id) => api.get(`/dashboard/${id}`);
export const updatePlace = (id, placeData) =>
  api.put(`/dashboard/${id}`, placeData);
export const deletePlace = (id) => api.delete(`/dashboard/${id}`);

export default api;

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
