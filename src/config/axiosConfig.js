import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: `http://localhost:8000/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } else if (error.request) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No response received from server.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default API;
