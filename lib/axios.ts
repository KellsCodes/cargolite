import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error.response exists before accessing data
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(message));
  }
);

export default api;
