import axios from "axios";

const api = axios.create({
  baseURL: "https://authentication-project-1-apyd.onrender.com/api",
  withCredentials: true,
});

export default api;
