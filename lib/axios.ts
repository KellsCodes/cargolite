import axios from "axios";

class ValidationError extends Error {
  public details: Record<string, string[]>;

  constructor(message: string, details: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
    // Maintains proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

const api = axios.create({
  baseURL: "/api",
});

// Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Pass 5xx server errors down
    if (status && status >= 500) {
      return Promise.reject(error);
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    const details = error.response?.data?.details;

    // If backend validation details exist, throw our custom class
    if (details && typeof details === "object") {
      return Promise.reject(new ValidationError(message, details));
    }

    // Standard fallback for other client/network errors
    return Promise.reject(new Error(message));
  }
);

export default api;
