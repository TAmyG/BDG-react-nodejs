import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { JobList } from "./JobList";
import { acLoadJobs } from "../../actions/jobAction";

export const JobBoard = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(acLoadJobs());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">JobBoard</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
