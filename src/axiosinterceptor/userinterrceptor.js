import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error Data:", error.response.data);
      console.error("Response Error Status:", error.response.status);
      if (error.response.status === 401) {
        toast.error("Unauthorized. Check your authentication credentials.");
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
      toast.error("No response received from the server.");
    } else {
      console.error("General Error:", error.message);
      toast.error("An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default instance;
