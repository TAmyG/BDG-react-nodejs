import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { JobBoardRoutes } from "./JobBoardRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <JobBoardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
