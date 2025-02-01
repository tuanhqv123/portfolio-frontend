const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://portfolio-backend.vercel.app/api"
      : "/api", // Using Vite's proxy for development
  withCredentials: true, // Enable credentials for all API requests
};

export default config;
