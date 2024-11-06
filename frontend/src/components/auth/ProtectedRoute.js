// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useUser();

  // Check if the user is authenticated and is an admin
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />; // Redirect to homepage or login if unauthorized
  }

  return children;
};

export default ProtectedRoute;