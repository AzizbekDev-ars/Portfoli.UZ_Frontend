import axios from "axios";

const API_URL = "http://localhost:4000"; // Serveringiz portiga qarab o'zgartiring

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
