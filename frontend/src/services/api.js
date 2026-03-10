import axios from "axios";

const API = axios.create({
  baseURL: "https://campus-air.onrender.com",
  withCredentials: true
});

export default API;