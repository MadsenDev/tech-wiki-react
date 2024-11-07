import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, isAuthenticated } = useUser();

  // Check if the user is authenticated and their role is allowed
  if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Redirect to homepage or login if unauthorized
  }

  return children;
};

export default ProtectedRoute;