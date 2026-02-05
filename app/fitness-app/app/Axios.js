import axios from "axios";

const baseUrl = `http://10.121.74.220:8000/`;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
