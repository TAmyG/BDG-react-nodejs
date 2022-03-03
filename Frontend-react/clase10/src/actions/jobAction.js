import { types } from "../types/types";
import { createJob, loadJob, loadJobs } from "../helpers/requestOPT";

export const acLoadJobs = () => {
  return async (dispatch) => {
    const jobs = await loadJobs();
    console.log(jobs);
    const action = {
      type: types.loadJobs,
      payload: {
        jobs,
      },
    };

    dispatch(action);
  };
};

export const acLoadJob = (jobId) => {
  return async (dispatch) => {
    const job = await loadJob(jobId);
    console.log(job);

    const action = {
      type: types.loadJob,
      payload: {
        job,
      },
    };

    dispatch(action);
  };
};

export const acCreateJob = (title, description, companyId) => {
  return async () => {
    const jobAdded = await createJob({ title, description, companyId });
    console.log(jobAdded);
    return jobAdded;
  };
};
