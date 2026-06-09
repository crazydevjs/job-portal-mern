import axios from "axios";
import api from "../services/api";

const res = await api.get("/jobs");

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;