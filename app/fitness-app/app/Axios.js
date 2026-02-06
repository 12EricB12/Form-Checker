import axios from "axios";

const baseUrl = `/`;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
