import axios from "axios";

// Create API instance without baseURL initially
export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

// Function to initialize API base URL from env.json
export const initializeApiBaseUrl = async () => {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/env.json');
      const config = await response.json();
      
      if (config.API_BASE_URL) {
        api.defaults.baseURL = config.API_BASE_URL;
        console.log('API initialized with baseURL:', config.API_BASE_URL);
      } else {
        throw new Error('API_BASE_URL not found in env.json');
      }
    } catch (error) {
      console.error('Failed to load env.json:', error);
      throw error;
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