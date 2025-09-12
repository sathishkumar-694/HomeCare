import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "./auth";

export default function PrivateRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
}
