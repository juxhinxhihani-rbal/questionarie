import axios from "axios";

// Initialize API instance as undefined initially
export let api: any;

export async function initApi() {
    const response = await fetch("env.json");
    const config = await response.json();
    const API_BASE_URL = config.API_BASE_URL;

    api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 100000,
    });

    api.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            if (error.response) {
                console.error("API Error:", error.response.data);
                const errorData = error.response.data;
                if (typeof errorData === 'object' && errorData !== null && errorData.message) {
                    throw new Error(errorData.message);
                } else {
                    throw new Error("An error occurred");
                }
            } else if (error.request) {
                console.error("Network Error:", error.request);
                throw new Error("Network error - no response received");
            } else {
                console.error("Request Error:", error.message);
                throw new Error("Error setting up the request");
            }
        }
    )
}