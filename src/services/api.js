import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-backend-r02c.onrender.com"
});

export default API;