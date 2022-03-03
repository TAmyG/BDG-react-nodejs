import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { acLoadJob } from "../../actions/jobAction";

export const JobDetail = () => {
  const dispatch = useDispatch();
  const { job } = useSelector((state) => state.job);

  const { jobId } = useParams();

  useEffect(() => {
    dispatch(acLoadJob(jobId));
  }, [jobId, dispatch]);

  return (
    <>
      {job && (
        <div>
          <h1 className="title">{job.title}</h1>
          {job.company && (
            <h2 className="subtitle">
              <Link to={`/companies/${job.company.id}`}>
                {job.company.name}
              </Link>
            </h2>
          )}
          <div className="box">{job.description}</div>
        </div>
      )}
    </>
  );
};
