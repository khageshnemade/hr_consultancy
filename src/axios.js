import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

// Create Axios instance
export const makeRequest = axios.create({
  baseURL: apiUrl,
});
export default makeRequest;


makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    config.headers["Content-Type"] =
      config.data instanceof FormData
        ? "multipart/form-data"
        : "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

