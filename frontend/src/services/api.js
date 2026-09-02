import axios from "axios";

const api = axios.create({
  baseURL: "https://authentication-project-2utt.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
