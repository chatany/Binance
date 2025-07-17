import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async ({
  method,
  url,
  data = null,
  params = null,
  headers = {},
}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      // The request was made and server responded with non-2xx
      return {
        data: error.response.data,
        status: error.response.status,
      };
    } else if (error.request) {
      // The request was made but no response
      console.error("No response received:", error.request);
      throw error;
    } else {
      // Something happened setting up the request
      console.error("Error setting up request:", error.message);
      throw error;
    }
  }
};
axiosInstance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const { token } = userData;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
