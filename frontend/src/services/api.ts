import axios from "axios";
import { getData } from "../utils/storage";

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // Use the environment variable for the base URL
  // baseURL: "http://172.20.10.4:5000/api", // Use the environment variable for the base URL
  baseURL: "https://pinpoint-72yf.onrender.com/api", // Use the environment variable for the base URL
  // timeout: 10000, // Set a timeout for requests (optional)
});

// Add a request interceptor to attach the token to every request (if needed)
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getData("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(config.url, config.baseURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error responses here (like 401 unauthorized, etc.)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., logout the user
      console.error("Unauthorized access - logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
