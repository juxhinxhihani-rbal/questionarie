import axios from "axios";

// Initialize with empty base URL
export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

// Function to initialize API base URL from env.json
export const initializeApiBaseUrl = async () => {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/env.json');
      const config = await response.json();
      api.defaults.baseURL = config.API_BASE_URL;
    } catch (error) {
      console.error('Failed to load env.json:', error);
    }
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error - no response received");
    } else {
      console.error("Request Error:", error.message);
      throw new Error("Error setting up the request");
    }
  }
);