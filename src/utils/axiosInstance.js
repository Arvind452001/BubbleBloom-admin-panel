// axiosInstance.js
import axios from "axios";
import { API_BASE_URL } from "./baseUrlConfig";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ================= REQUEST INTERCEPTOR ================= //
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    // 🔐 Attach token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🚫 Skip if no data (GET requests etc.)
    if (!config.data) return config;

    // ⚠️ Don't override if already set manually
    if (config.headers["Content-Type"]) return config;

    // ✅ Handle FormData (file upload)
    if (config.data instanceof FormData) {
      // Let browser set correct boundary
      return config;
    }

    // ✅ Handle URLSearchParams (form-urlencoded)
    if (config.data instanceof URLSearchParams) {
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      return config;
    }

    // ✅ Handle plain object (JSON)
    if (typeof config.data === "object") {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR ================= //
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 🔴 Handle Unauthorized (token expired)
    if (error.response?.status === 401) {
      console.log("🔒 Token expired");

      // ❌ Remove token
      localStorage.removeItem("authToken");

      // 👉 Optional: clear other user data
      localStorage.removeItem("user");

      // 👉 Redirect to login
      window.location.href = "/login";

      // 👉 Optional message (better UX)
      alert("Session expired. Please login again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;