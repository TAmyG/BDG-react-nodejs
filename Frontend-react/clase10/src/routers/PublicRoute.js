import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/auth";

export const PublicRoute = ({ children }) => {
  const loggedIn = isLoggedIn();
  return loggedIn ? <Navigate to="/home" /> : children;
};
