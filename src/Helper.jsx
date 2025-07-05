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
    console.error("API Error:", error);
    throw error;
  }
};
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("token");
//     // if (token) {
//       config.headers["Authorization"] = `Bearer dpdT8rSuHG9ztPpu_SKH`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
