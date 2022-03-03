import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/auth";

export const PrivateRoute = ({ children }) => {
  const loggedIn = isLoggedIn();
  return loggedIn ? children : <Navigate to="login" />;
};
