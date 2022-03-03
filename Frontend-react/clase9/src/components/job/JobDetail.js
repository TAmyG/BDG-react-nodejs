import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { loadJob } from "../../helpers/requestOPT";

export const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    load();

    async function load() {
      const job = await loadJob(jobId);
      setJob(job);
    }
  }, [jobId]);

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
