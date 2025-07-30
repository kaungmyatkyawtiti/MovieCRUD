import axios from "axios";

console.log("axiosInstance.ts loaded!");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000
});

export default axiosInstance;
