import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error mapping
    const message =
      error.response?.data?.error || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
