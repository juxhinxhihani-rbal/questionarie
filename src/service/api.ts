import axios from "axios";

// Configuration interface
interface ApiConfig {
  API_BASE_URL: string;
}

// Function to load configuration from env.json
const loadConfig = async (): Promise<ApiConfig> => {
  try {
    const response = await fetch('/env.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    
    if (!config.API_BASE_URL) {
      throw new Error('API_BASE_URL not found in env.json');
    }
    
    return {
      API_BASE_URL: config.API_BASE_URL
    };
  } catch (error) {
    console.error('Failed to load env.json:', error);
    throw new Error('API configuration could not be loaded. Please ensure env.json exists with API_BASE_URL.');
  }
};

// Create axios instance without base URL initially
export const api = axios.create({
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
    throw error;
  }
};

// Auto-initialize when module loads (client-side only)
if (typeof window !== 'undefined') {
  initializeApi().catch(console.error);
}

// Export function to manually initialize if needed
export const initApi = initializeApi;

// Request interceptor to ensure config is loaded
api.interceptors.request.use(
  async (config) => {
    if (!configLoaded && typeof window !== 'undefined') {
      await initializeApi();
    }
    
    if (!api.defaults.baseURL) {
      throw new Error('API base URL not configured. Please check env.json file.');
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