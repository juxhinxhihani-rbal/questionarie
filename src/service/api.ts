import axios from "axios";

// Configuration interface
interface ApiConfig {
  API_BASE_URL: string;
}

// Default configuration
const DEFAULT_CONFIG: ApiConfig = {
  API_BASE_URL: "https://localhost:7210//"
};

// Function to load configuration from env.json
const loadConfig = async (): Promise<ApiConfig> => {
  try {
    const response = await fetch('/env.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    return {
      API_BASE_URL: config.API_BASE_URL || DEFAULT_CONFIG.API_BASE_URL
    };
  } catch (error) {
    console.warn('Failed to load env.json, using default configuration:', error);
    return DEFAULT_CONFIG;
  }
};

// Create axios instance with default config
export const api = axios.create({
  baseURL: DEFAULT_CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

// Initialize API configuration
let configLoaded = false;

const initializeApi = async () => {
  if (configLoaded) return;
  
  try {
    const config = await loadConfig();
    api.defaults.baseURL = config.API_BASE_URL;
    configLoaded = true;
    console.log('API initialized with base URL:', config.API_BASE_URL);
  } catch (error) {
    console.error('Failed to initialize API configuration:', error);
  }
};

// Auto-initialize when module loads (client-side only)
if (typeof window !== 'undefined') {
  initializeApi();
}

// Export function to manually initialize if needed
export const initApi = initializeApi;

// Request interceptor to ensure config is loaded
api.interceptors.request.use(
  async (config) => {
    if (!configLoaded && typeof window !== 'undefined') {
      await initializeApi();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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