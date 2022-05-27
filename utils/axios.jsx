import axios from "axios";

const API_BASE_URL = "http://localhost:5000/";

var axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;