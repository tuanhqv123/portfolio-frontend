// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5001/api";

// Auth endpoints
export const AUTH_ENDPOINTS = {
  SIGNIN: `${API_BASE_URL}/auth/signin`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  GOOGLE: `${API_BASE_URL}/auth/google`,
  SIGNOUT: `${API_BASE_URL}/auth/signout`,
  ME: `${API_BASE_URL}/auth/me`,
} as const;

// Hàm helper để gọi API
export const fetchApi = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};
