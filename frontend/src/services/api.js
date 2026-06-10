import axios from "axios";
import api from "../services/api";

const res = await api.get("/jobs");

const api = axios.create({
  baseURL: "https://job-portal-mern-88c6.onrender.com/api",
});

export default api;