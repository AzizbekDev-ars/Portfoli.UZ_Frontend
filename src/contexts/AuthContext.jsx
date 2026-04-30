import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await api.get("/auth/me");
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        const { token, user: userData } = response.data;
        localStorage.setItem("token", token);
        setUser(userData);
        return userData;
    };

    const register = async (username, email, password) => {
        const response = await api.post("/auth/register", { username, email, password });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
