import axios from "axios";

// Load API base URL from env.json
let API_BASE_URL = "";

// Fetch the API URL from env.json
fetch('/env.json')
  .then(response => response.json())
  .then(config => {
    API_BASE_URL = config.API_BASE_URL;
    api.defaults.baseURL = API_BASE_URL;
  })
  .catch(error => {
    console.error('Failed to load env.json:', error);
  });

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

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