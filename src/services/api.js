import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://portfoliuzbackend-production.up.railway.app/"; // Serveringiz portiga qarab o'zgartiring

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: Har bir so'rovga tokenni qo'shish
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
