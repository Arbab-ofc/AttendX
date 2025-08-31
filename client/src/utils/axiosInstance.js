
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://attendx-v8hq.onrender.com/api/", 
  withCredentials: true,
});

export default axiosInstance;
