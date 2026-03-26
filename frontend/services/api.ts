// api.ts
import axios from "axios";
import { BACKEND_URL } from "../lib/env"; // import the backend URL

const api = axios.create({
  baseURL: BACKEND_URL, // use environment variable
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
