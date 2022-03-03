import React, { useState, useEffect } from "react";
import { loadJobs } from "../../helpers/requestOPT";
import { JobList } from "./JobList";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    load();

    async function load() {
      const jobs = await loadJobs();
      setJobs(jobs);
    }
  }, []);

  return (
    <div>
      <h1 className="title">JobBoard</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
