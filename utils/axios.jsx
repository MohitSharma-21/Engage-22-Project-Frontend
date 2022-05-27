import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/";
const API_BASE_URL = "https://picture-and-todo-manager.herokuapp.com/";

var axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;