import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasToken = () => {
    let flag = false;
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  };
  return hasToken() ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
