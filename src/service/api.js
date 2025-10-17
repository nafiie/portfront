// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://portback-06e7.onrender.com/api", 
});

// Automatically attach the token (if logged in)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
