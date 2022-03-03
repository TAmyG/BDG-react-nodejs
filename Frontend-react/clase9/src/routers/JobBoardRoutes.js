import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { LoginForm } from "../components/auth/LoginForm";
import { JobBoard } from "../components/job/JobBoard";
import { JobForm } from "../components/job/JobForm";
import { JobDetail } from "../components/job/JobDetail";
import { CompanyDetail } from "../components/CompanyDetail";

export const JobBoardRoutes = () => {
  return (
    <>
      <NavBar />

      <div className="container">
        <Routes>
          <Route exact path="/" element={<JobBoard />} />
          <Route path="/companies/:companyId" element={<CompanyDetail />} />
          <Route exact path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
