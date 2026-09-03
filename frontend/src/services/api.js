import axios from "axios";

const api = axios.create({
  baseURL: "https://authentication-project-1-apyd.onrender.com/api",
  withCredentials: true,
});

console.log("New API url loaded");
console.log(api.defaults.baseURL);

export default api;
