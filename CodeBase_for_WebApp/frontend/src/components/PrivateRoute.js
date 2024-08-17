// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" />;
  }

  // If token exists, render the children components
  return children;
};

export default PrivateRoute;
