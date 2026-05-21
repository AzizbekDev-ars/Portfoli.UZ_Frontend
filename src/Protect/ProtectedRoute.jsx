import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token');
  
  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, let them through
  if (token) {
    return children;
  }

  return children;
};

export default ProtectedRoute;
